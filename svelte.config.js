// noinspection JSValidateTypes,JSUnusedGlobalSymbols,JSUnusedLocalSymbols,JSCheckFunctionSignatures

import adapterWeb from '@sveltejs/adapter-static'
import adapterDesktop from './scripts/svelte-adapter-neutralino.js'
import preprocess from 'svelte-preprocess'
import 'dotenv/config'

const isDevelopment = process.env.NODE_ENV === 'development'
const isProduction = process.env.NODE_ENV === 'production'
const GlobalDebug = process.env.GLOBAL_DEBUG === 'true'
const BuildComponents = process.env.BUILD_COMPONENTS === 'true'
const BuildWeb = process.env.BUILD_WEBSITE === 'true'
const BuildDesktop = process.env.BUILD_DESKTOP === 'true'

const adapterWebInstace = adapterWeb({
	pages: 'docs',
	assets: 'docs',
	fallback: 'index.html'
})

const adapterDesktopInstace = adapterDesktop({
	name: 'EmuOS v2.0',
	applicationId: 'net.emupedia.emuos',
	icon: 'favicon.ico',
	window: {
		width: 800,
		height: 500,
		minWidth: 400,
		minHeight: 200,
		resizable: true,
		maximize: false,
		enableInspector: GlobalDebug
	},
	output: 'build'
})

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		dev: !isProduction,
		customElement: BuildComponents && !BuildWeb && !BuildDesktop
	},
	extensions: ['.svelte'],
	kit: {
		adapter: BuildWeb ? adapterWebInstace : (BuildDesktop ? adapterDesktopInstace : undefined),
		// alias: {},
		appDir: 'emuos',
		// csp: {
		// 	mode: 'auto',
		// 	directives: {}
		// },
		// env: {
		// 	dir: process.cwd(),
		// 	publicPrefix: 'PUBLIC_'
		// },
		// browser: {
		// 	hydrate: true,
		// 	router: true
		// },
		files: {
			assets: 'www',
			// hooks: 'src/hooks',
			// lib: 'src/lib',
			// params: 'src/params',
			// routes: 'src/routes',
			// serviceWorker: 'src/service-worker',
			appTemplate: 'src/index.html'
		},
		// inlineStyleThreshold: 0,
		methodOverride: {
			// parameter: '_method',
			allowed: ['PUT', 'PATCH', 'DELETE', 'OPTIONS']
		},
		// moduleExtensions: ['.js', '.ts'],
		// outDir: '.svelte-kit',
		// paths: {
		// 	assets: '',
		// 	base: ''
		// },
		// prerender: {
			// concurrency: 1,
			// crawl: true,
			// default: false,
			// enabled: true,
			// entries: ['*'],
			// onError: 'fail',
			// origin: 'http://sveltekit-prerender'
		// },
		serviceWorker: {
			register: isProduction && (BuildWeb || BuildDesktop),
			// TODO: move this to env variable
			files: filepath => !/\.DS_Store/.test(filepath) && !/\.nojekyll/.test(filepath) && !/_config\.yml/.test(filepath) && !/CNAME/.test(filepath) && !/vite-manifest\.json/.test(filepath)
		},
		// trailingSlash: 'never',
		// version: {
		// 	name: Date.now().toString(),
		// 	pollInterval: 0
		// }
	},
	// package: {
		// dir: 'package',
		// emitTypes: true,
		// exports: filepath => !/^_|\/_|\.d\.ts$/.test(filepath),
		// files: () => true
	// },
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			preserve: ['ld+json'],
			postcss: true,
			scss: {
				prependData: '@use "src/variables.scss" as *;'
			}
		})
	],
	onwarn: (warning, handler) => {
		const { code } = warning

		if (BuildComponents && code === 'custom-element-no-tag') {
			return
		}

		if ((BuildWeb || BuildDesktop) && code === 'missing-custom-element-compile-options') {
			return
		}

		if (code === 'css-unused-selector') {
			return
		}

		handler(warning)
	}
}

export default config