// noinspection JSValidateTypes,JSUnusedGlobalSymbols

import adapterWeb from '@sveltejs/adapter-static'
import adapterDesktop from './scripts/svelte-adapter-neutralino.js'
import preprocess from 'svelte-preprocess'
import 'dotenv/config'

const isProd = process.env.NODE_ENV === 'production'
const isComponents = process.env.BUILD_COMPONENTS === 'true'
const isWeb = process.env.BUILD_WEBSITE === 'true'
const isDesktop = process.env.BUILD_DESKTOP === 'true'

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
		enableInspector: true
	},
	output: 'build'
})

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		dev: !isProd,
		customElement: isComponents && !isWeb && !isDesktop
	},
	kit: {
		adapter: isWeb ? adapterWebInstace : (isDesktop ? adapterDesktopInstace : adapterWebInstace) ,
		appDir: 'emuos',
		files: {
			assets: 'www',
			template: 'src/index.html'
		},
		methodOverride: {
			allowed: ['PUT', 'PATCH', 'DELETE', 'OPTIONS']
		},
		prerender: {
			default: false
		},
		serviceWorker: {
			register: isProd && (isWeb || isDesktop)
		}
	},
	onwarn: (warning, handler) => {
		const { code } = warning

		if (isWeb && code === 'missing-custom-element-compile-options') {
			return
		}

		if (code === 'css-unused-selector')
			return

		handler(warning)
	},
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
	]
}

export default config