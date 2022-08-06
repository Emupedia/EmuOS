import adapter from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess'

const isProd = process.env.NODE_ENV === 'production'
const plugins = []

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

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
		/*prerender: {
			default: false
		},*/
		serviceWorker: {
			register: isProd
		}
	}
}

export default config