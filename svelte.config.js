import adapter from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess'

const isProd = process.env.NODE_ENV === 'production'
const plugins = []

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'docs',
			assets: 'docs',
			fallback: 'index.html'
		}),
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