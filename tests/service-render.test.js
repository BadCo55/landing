import test from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'vite'
import { createServer as createHttpServer } from 'node:http'
import vue from '@vitejs/plugin-vue'
import { createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { createPinia } from 'pinia'
import { createRouter, createMemoryHistory } from 'vue-router'
import PrimeVue from 'primevue/config'
import { inspectionIntents } from '../src/utils/inspectionIntent.js'

test('service pages render with matching quote links, and the main quote retains its default flow', async () => {
  const transport = createHttpServer()
  const server = await createServer({
    configFile: false,
    root: process.cwd(),
    plugins: [
      {
        name: 'quote-render-fixtures',
        enforce: 'pre',
        transform(code, id) {
          if (!id.endsWith('/src/views/RequestQuoteView.vue')) return
          return code
            .replace('const step = ref(1)', 'const step = ref(globalThis.__quoteRenderStep || 1)')
            .replace(
              'const propertyFeatures = [',
              'if (globalThis.__quoteRenderYear) form.step2.year_built = globalThis.__quoteRenderYear\nconst propertyFeatures = [',
            )
        },
      },
      vue(),
    ],
    resolve: { alias: { '@': process.cwd() + '/src' } },
    server: { middlewareMode: true, hmr: { server: transport }, watch: null },
    appType: 'custom',
  })
  globalThis.window = { location: { hostname: 'preview.example', search: '' } }
  globalThis.document = { querySelector: () => null }
  const previousFetch = globalThis.fetch
  globalThis.fetch = () => {
    throw new Error('Rendering must not submit a lead')
  }
  try {
    const Service = (await server.ssrLoadModule('/src/views/ServiceLandingView.vue')).default
    const Quote = (await server.ssrLoadModule('/src/views/CampaignQuoteView.vue')).default
    const Report = (await server.ssrLoadModule('/src/views/CampaignReportView.vue')).default
    const Request = (await server.ssrLoadModule('/src/views/RequestQuoteView.vue')).default
    const routes = [
      ...Object.entries(inspectionIntents).map(([key, value]) => ({
        path: value.path,
        component: Service,
        meta: { inspection: key },
      })),
      { path: '/request-quote', component: Quote },
      { path: '/sample-report', component: Report },
      { path: '/:pathMatch(.*)*', component: { render: () => null } },
    ]
    async function render(component, path, props = {}) {
      const router = createRouter({ history: createMemoryHistory(), routes })
      await router.push(path)
      const app = createSSRApp({ render: () => h(component, props) })
        .use(createPinia())
        .use(router)
        .use(PrimeVue)
      return renderToString(app)
    }
    for (const [key, context] of Object.entries(inspectionIntents)) {
      const html = await render(Service, context.path)
      assert.match(html, /<h1>/)
      assert.ok(html.includes('/request-quote?inspection=' + key), key + ' quote context missing')
      assert.ok(html.includes(context.label), key + ' service label missing')
      assert.ok(
        html.includes('id="services"') &&
          html.includes('id="difference"') &&
          html.includes('id="faq"'),
      )
      const quote = await render(Quote, '/request-quote?inspection=' + key)
      assert.ok(quote.includes(context.title.replaceAll('’', '’')), key + ' quote title missing')
      assert.ok(quote.includes('href="' + context.path + '"'), key + ' return path missing')
      if (key === 'progressive') assert.match(quote, /project-request/)
      else assert.match(quote, /quote-builder/)
    }
    const main = await render(Quote, '/request-quote')
    assert.ok(main.includes('Let’s plan your inspection.'))
    assert.ok(main.includes('href="/"'))
    assert.ok(!main.includes('quote-intent-choice'))
    const invalid = await render(Quote, '/request-quote?inspection=wind&inspection=commercial')
    assert.ok(invalid.includes('Let’s plan your inspection.'))
    const report = await render(Report, '/sample-report?inspection=general')
    assert.ok(report.includes('href="/general-inspection"'))
    assert.ok(report.includes('/request-quote?inspection=general'))
    // Exercise the actual existing package-selection logic, including feature-rich properties.
    for (const [starter, expected] of [
      ['wind_only', ['wind_mitigation']],
      ['four_point_only', ['four_point']],
      ['insurance_only', ['four_point', 'roof_inspection', 'wind_mitigation']],
    ]) {
      let setup
      const Harness = {
        setup() {
          setup = Request.setup({ inspectionIntent: '' }, { expose() {} })
          return () => h('div')
        },
      }
      await render(Harness, '/request-quote')
      Object.assign(setup.form.step3, { pool: true, crawlspace: true, well_water: true })
      setup.form.step4.selected_package = starter
      setup.step5Services.value
      assert.deepEqual(
        Object.keys(setup.form.step5.selected_services)
          .filter((key) => setup.form.step5.selected_services[key])
          .sort(),
        expected,
      )
    }
    // Render the changed service/maintenance/package surfaces without opening a browser.
    for (const [intent, stepNumber, year, expected] of [
      ['general', 5, 1965, 'Worth a closer look.'],
      ['maintenance', 3, 1985, 'What brings you in for a yearly check?'],
      ['wind', 5, 1965, 'The reports your insurer needs.'],
      ['new-construction', 4, new Date().getFullYear(), 'Completed new-home inspection'],
      ['commercial', 4, 1995, 'Commercial property inspection'],
    ]) {
      globalThis.__quoteRenderStep = stepNumber
      globalThis.__quoteRenderYear = year
      const html = await render(Request, '/request-quote?inspection=' + intent, {
        inspectionIntent: intent,
      })
      assert.ok(html.includes(expected), intent + ' contextual surface missing')
      if (intent === 'wind') {
        assert.ok(!html.includes('age-recommendation-list'))
        assert.ok(!html.includes('id="general_inspection"'))
      }
    }
    delete globalThis.__quoteRenderStep
    delete globalThis.__quoteRenderYear
    // Use actual handlers to verify forward/back steps and preservation of edited selections.
    for (const intent of ['insurance', 'wind', 'four-point', 'general']) {
      let setup
      const Harness = {
        setup() {
          setup = Request.setup({ inspectionIntent: intent }, { expose() {} })
          return () => h('div')
        },
      }
      await render(Harness, '/request-quote?inspection=' + intent)
      setup.step.value = 2
      setup.onSubmitStep2({ valid: true })
      assert.equal(setup.step.value, intent === 'general' ? 3 : 5)
      if (intent === 'wind') assert.equal(setup.form.step5.selected_services.wind_mitigation, true)
      if (intent === 'four-point') assert.equal(setup.form.step5.selected_services.four_point, true)
      if (intent === 'insurance') {
        setup.onSubmitStep5()
        assert.equal(setup.step.value, 5)
        assert.ok(setup.serviceSelectionError.value)
      }
      if (intent !== 'general') {
        setup.form.step5.selected_services.roof_inspection = true
        setup.onSubmitStep5()
        assert.equal(setup.step.value, 6)
        setup.goBack()
        assert.equal(setup.step.value, 5)
        setup.goBack()
        assert.equal(setup.step.value, 2)
        setup.onSubmitStep2({ valid: true })
        assert.equal(setup.form.step5.selected_services.roof_inspection, true)
      } else {
        setup.step.value = 4
        setup.onSubmitStep4('basic')
        setup.toggleRecommended('lead_based_paint_inspection')
        setup.goBack()
        setup.onSubmitStep4('basic')
        assert.equal(setup.form.step5.selected_services.lead_based_paint_inspection, true)
      }
    }
    // No detailed request can reach the old customer-quote webhook or carry quote-email data.
    for (const mode of ['preview', 'failure', 'success']) {
      let setup,
        calls = []
      const events = []
      window.location.hostname =
        mode === 'preview' ? 'preview.example' : 'landing.diversifiedhomeinspections.com'
      window.gtag = (...event) => events.push(event)
      window.fbq = (...event) => events.push(event)
      globalThis.fetch = async (url, options) => {
        calls.push({ url, payload: JSON.parse(options.body) })
        return { ok: mode === 'success' }
      }
      const Harness = {
        setup() {
          setup = Request.setup({ inspectionIntent: 'maintenance' }, { expose() {} })
          return () => h('div')
        },
      }
      await render(Harness, '/request-quote?inspection=maintenance')
      Object.assign(setup.form.step1, {
        first_name: 'Test',
        last_name: 'Visitor',
        email: 'test@example.com',
        phone_number: '9545550123',
      })
      Object.assign(setup.form.step2, {
        street_address: '123 Example Street',
        city: 'Davie',
        zip_code: '33328',
        county: 'Broward',
        property_type: { key: 'single_family', value: 'Single Family Home' },
        year_built: 1965,
        square_footage: 2500,
      })
      setup.form.step5.selected_services.general_inspection = true
      setup.form.step5.selected_services.lead_based_paint_inspection = true
      setup.step.value = 6
      await Promise.all([setup.onSubmitStep6(), setup.onSubmitStep6()])
      assert.equal(calls.length, mode === 'preview' ? 0 : 1)
      for (const request of calls) {
        assert.equal(request.url, 'https://hooks.zapier.com/hooks/catch/5555872/2sxd8wt/')
        assert.equal(request.payload.mailersend, undefined)
        assert.equal(request.payload.inspectionFee, undefined)
        assert.ok(!request.payload.message.includes('$'))
        assert.ok(request.payload.message.includes('lead based paint inspection'))
      }
      assert.equal(setup.step.value, mode === 'failure' ? 6 : 8)
      assert.equal(events.length, mode === 'success' ? 3 : 0)
    }
    const Project = (
      await server.ssrLoadModule('/src/components/campaign/ProgressiveProjectForm.vue')
    ).default
    const projectData = {
      name: 'Test Visitor',
      email: 'visitor@example.com',
      phone: '9545550123',
      address: '123 Example Street',
      city: 'Davie',
      zip: '33328',
      propertyType: 'Single-family home',
      size: '2800',
      stage: 'Structure / framing',
      scope: 'Review the work at agreed construction stages.',
      timing: 'In two weeks',
      notes: '',
      website: '',
    }
    for (const mode of ['preview', 'failure', 'success']) {
      let setup,
        calls = 0
      const events = []
      window.location.hostname =
        mode === 'preview' ? 'preview.example' : 'landing.diversifiedhomeinspections.com'
      window.gtag = (...event) => events.push(event)
      window.fbq = (...event) => events.push(event)
      globalThis.fetch = async () => {
        calls++
        return { ok: mode === 'success' }
      }
      const Harness = {
        setup() {
          setup = Project.setup({}, { expose() {} })
          return () => h('div')
        },
      }
      await render(Harness, '/request-quote?inspection=progressive')
      Object.assign(setup.form, projectData)
      const first = setup.submit()
      const duplicate = setup.submit()
      await Promise.all([first, duplicate])
      assert.equal(calls, mode === 'preview' ? 0 : 1)
      assert.equal(
        setup.status.value,
        mode === 'preview' ? 'preview' : mode === 'failure' ? 'error' : 'success',
      )
      assert.equal(events.length, mode === 'success' ? 3 : 0)
    }
  } finally {
    globalThis.fetch = previousFetch
    delete globalThis.window
    delete globalThis.document
    delete globalThis.__quoteRenderStep
    delete globalThis.__quoteRenderYear
    await server.close()
    transport.close()
  }
})
