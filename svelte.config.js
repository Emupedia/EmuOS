import adapter from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess'

const isProd = process.env.NODE_ENV === 'production'
const plugins = []

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			scss: {
				prependData: '@use "src/variables.scss" as *;'
			}
		})
	],
	kit: {
		appDir: 'docs',
		/*paths: {
			base: '',
		},*/
		adapter: adapter({
			pages: 'docs',
			// assets: 'docs',
			fallback: '404.html',
			precompress: true
		}),
		files: {
			/*assets: 'static',
			hooks: 'src/hooks',
			lib: 'src/lib',
			params: 'src/params',
			routes: 'src/routes',
			serviceWorker: 'src/service-worker',*/
			template: 'src/index.html'
		},
		methodOverride: {
			allowed: ['PUT', 'PATCH', 'DELETE', 'OPTIONS']
		},
		/*prerender: {
			default: false
		},*/
		serviceWorker: {
			register: isProd
		}
	}
}

export default config