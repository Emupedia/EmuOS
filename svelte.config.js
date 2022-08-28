// noinspection JSValidateTypes,JSUnusedGlobalSymbols

import adapterWeb from '@sveltejs/adapter-static'
import adapterDesktop from './scripts/svelte-adapter-neutralino.js'
import preprocess from 'svelte-preprocess'
import 'dotenv/config'

const isProd = process.env.NODE_ENV === 'production'
const isWeb = process.env.BUILD_WEBSITE === 'true'

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
		maximize: false
	},
	output: 'build'
})

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: isWeb ? adapterWebInstace : adapterDesktopInstace,
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
			register: isProd
		}
	},
	onwarn: (warning, handler) => {
		const { code } = warning

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