import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'
import { createRouter, createMemoryHistory } from 'vue-router'
import { isProductionHost } from '../src/utils/campaign.js'

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
const bootstrap = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8')

function initialize(hostname) {
  const scripts = []
  const window = { location: { hostname } }
  const document = {
    createElement: () => ({}),
    head: { appendChild: (script) => scripts.push(script) },
    getElementsByTagName: () => [
      { parentNode: { insertBefore: (script) => scripts.push(script) } },
    ],
  }
  for (const [, code] of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) {
    runInNewContext(code, { window, document })
  }
  return { window, document, scripts }
}

test('the actual HTML initializes each vendor once and excludes non-production hosts', () => {
  const { window, scripts } = initialize('landing.diversifiedhomeinspections.com')
  const commands = window.dataLayer.map((args) => Array.from(args))
  assert.equal(commands.filter(([command]) => command === 'js').length, 1)
  const configs = commands.filter(([command]) => command === 'config')
  assert.equal(configs.length, 1)
  assert.equal(configs[0][1], 'G-4SNFF2NPXN')
  assert.notEqual(configs[0][2]?.send_page_view, false)
  assert.equal(scripts.length, 2)
  assert.equal(
    scripts.filter(({ src }) => src === 'https://www.googletagmanager.com/gtag/js?id=G-4SNFF2NPXN')
      .length,
    1,
  )
  assert.equal(
    scripts.filter(({ src }) => src === 'https://connect.facebook.net/en_US/fbevents.js').length,
    1,
  )
  assert.deepEqual(Array.from(window.fbq.queue[0]), ['init', '5092520094149116'])
  assert.equal(window.fbq.queue.length, 1, 'HTML leaves Meta PageView to the router')

  for (const host of [
    'localhost',
    '127.0.0.1',
    'preview.example',
    'staging.diversifiedhomeinspections.com',
    'landing.diversifiedhomeinspections.com.example.com',
  ]) {
    const preview = initialize(host)
    assert.equal(preview.scripts.length, 0)
    assert.equal(preview.window.gtag, undefined)
    assert.equal(preview.window.fbq, undefined)
  }
})

test('the actual navigation hook owns only Meta path views, including redirects and failures', async () => {
  const context = initialize('landing.diversifiedhomeinspections.com')
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/:pathMatch(.*)*', component: {}, meta: { title: 'Audit route' } }],
  })
  router.beforeEach((to) => {
    if (to.path === '/blocked') return false
    if (to.query['sample-report'] === 'true') return '/sample-report'
  })
  const start = bootstrap.indexOf('router.afterEach(')
  const end = bootstrap.indexOf('\napp.use(router)', start)
  assert.ok(start >= 0 && end > start)
  runInNewContext(bootstrap.slice(start, end), { ...context, router, isProductionHost })
  const views = () => context.window.fbq.queue.filter((args) => args[1] === 'PageView').length
  await router.push('/')
  assert.equal(views(), 1)
  await router.push('/?utm_source=google')
  await router.push('/?utm_source=google#quote')
  await router.push('/?utm_source=google#quote')
  await router.push('/blocked')
  assert.equal(views(), 1, 'query, hash, duplicate and failed navigation do not count')
  await router.push('/request-quote')
  assert.equal(views(), 2)
  await router.push('/request-quote?inspection=wind')
  assert.equal(views(), 2, 'existing policy counts paths, not inspection query changes')
  await router.push('/?sample-report=true')
  assert.equal(views(), 3, 'redirect counts only its final route')
  await router.push('/')
  assert.equal(views(), 4, 'returning to a previously visited path is a new view')
  context.window.location.hostname = 'preview.example'
  await router.push('/privacy')
  assert.equal(views(), 4, 'even installed vendor stubs are excluded on preview')
  assert.equal(
    context.window.dataLayer.filter((args) => args[0] === 'event').length,
    0,
    'bootstrap/navigation never manually send a GA pageview',
  )
})
