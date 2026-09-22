import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'
import { createServer as createHttpServer } from 'node:http'
import vue from '@vitejs/plugin-vue'
import { createSSRApp, createRenderer, h, ssrContextKey } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { createPinia } from 'pinia'
import { inspectionIntents, inspectionQuoteLink } from '../src/utils/inspectionIntent.js'

const root = fileURLToPath(new URL('../', import.meta.url))

test('every active route offers external requests and no local submission forms', async () => {
  const transport = createHttpServer()
  const server = await createServer({
    configFile: false,
    root,
    optimizeDeps: { noDiscovery: true },
    plugins: [
      {
        name: 'memory-history-for-route-tests',
        enforce: 'pre',
        transform(code, id) {
          if (id.endsWith('/src/router/index.js'))
            return code.replaceAll('createWebHistory', 'createMemoryHistory')
        },
      },
      vue(),
    ],
    resolve: { alias: { '@': root + 'src' } },
    server: { middlewareMode: true, hmr: { server: transport }, watch: null },
    appType: 'custom',
  })
  const previousWindow = globalThis.window
  const previousFetch = globalThis.fetch
  const redirects = []
  globalThis.window = { location: { replace: (url) => redirects.push(url) } }
  globalThis.fetch = () => {
    throw new Error('Landing pages must never submit requests')
  }
  try {
    const router = (await server.ssrLoadModule('/src/router/index.js')).default
    const { useAppStore } = await server.ssrLoadModule('/src/stores/appStore.js')
    const pinia = createPinia()
    const store = useAppStore(pinia)
    const paths = [
      '/',
      '/homebuyer',
      '/realtor',
      '/investor',
      '/sample-report',
      '/privacy',
      '/missing',
      ...Object.values(inspectionIntents).map((item) => item.path),
    ]
    for (const attribution of [
      {},
      {
        utm_source: 'google',
        utm_medium: 'cpc',
        utm_campaign: 'South Florida & homes',
        gclid: 'google-click',
        fbclid: 'meta-click',
        ttclid: 'tiktok-click',
        email: 'never-forward@example.com',
        placement: 'not-an-acquisition-source',
      },
      { utm_source: 'tiktok', ttclid: 'updated-click' },
    ]) {
      store.setUTMParams(attribution)
      const expectedURL = inspectionQuoteLink(attribution)
      redirects.length = 0
      for (const path of paths) {
        await router.push(path)
        const component = router.currentRoute.value.matched.at(-1).components.default
        const app = createSSRApp({ render: () => h(component) })
          .use(pinia)
          .use(router)
        const html = (await renderToString(app)).replaceAll('&amp;', '&')
        assert.ok(/<h1\b/.test(html), path + ' heading missing')
        assert.ok(html.includes('href="' + expectedURL + '"'), path + ' external request missing')
        assert.doesNotMatch(html, /<(form|input|textarea)\b/i, path + ' must not collect form data')
        assert.doesNotMatch(
          html,
          /href="[^" ]*\/request-quote(?:[?"#])/i,
          path + ' has a local request link',
        )
        assert.doesNotMatch(html, /Zapier|Request a callback/i)
        // Every request/quote CTA must resolve to the central external destination.
        for (const [, attrs, label] of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)) {
          const text = label
            .replace(/<[^>]*>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
          if (/\bquote\b|request (?:an? |my |your |project |inspection)/i.test(text))
            assert.ok(attrs.includes('href="' + expectedURL + '"'), path + ': ' + text)
        }
      }
      // Real route resolution preserves old bookmarks but only exposes a redirect/fallback link.
      for (const path of [
        '/request-quote',
        '/request-quote/',
        '/request-quote?inspection=progressive',
        '/request-quote?sample-report=true',
      ]) {
        await router.push(path)
        assert.equal(router.currentRoute.value.name, 'quote')
        const Redirect = router.currentRoute.value.matched.at(-1).components.default
        const html = (await renderToString(createSSRApp(Redirect).use(pinia))).replaceAll(
          '&amp;',
          '&',
        )
        assert.ok(html.includes('href="' + expectedURL + '"'))
        assert.doesNotMatch(html, /<(form|input|textarea)\b/i)
        // Exercise the real setup/mount hook using an inert renderer; never navigate a browser.
        const renderer = createRenderer({
          createElement: () => ({}),
          insert() {},
          remove() {},
          patchProp() {},
          createText: () => ({}),
          createComment: () => ({}),
          setText() {},
          setElementText() {},
          parentNode: () => null,
          nextSibling: () => null,
        })
        const app = renderer.createApp({
          setup() {
            Redirect.setup({}, { expose() {} })
            return () => h('div')
          },
        })
        app.use(pinia)
        app.provide(ssrContextKey, {})
        app.mount({})
        app.unmount()
      }
      assert.deepEqual(redirects, Array(4).fill(expectedURL))
    }
    await router.push('/?sample-report=true')
    assert.equal(router.currentRoute.value.name, 'sampleReport')
  } finally {
    globalThis.window = previousWindow
    globalThis.fetch = previousFetch
    await server.close()
    transport.close()
  }
})

test('application source contains no local forms, webhook senders or lead-conversion emitters', () => {
  const files = readdirSync(root + 'src', { recursive: true }).filter((file) =>
    /\.(vue|js)$/.test(file),
  )
  for (const file of files) {
    const source = readFileSync(root + 'src/' + file, 'utf8')
    assert.doesNotMatch(
      source,
      /hooks\.zapier\.com|sendLead|trackLead|generate_lead|callback_request|form_submit|form_start|fetch\s*\(/,
      file,
    )
    assert.doesNotMatch(source, /<(?:form|Form)\b/, file)
  }
})
