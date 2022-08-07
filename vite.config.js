import { sveltekit } from '@sveltejs/kit/vite'
// import legacy from '@vitejs/plugin-legacy'
// import babel from '@rollup/plugin-babel'
// import path from 'path'
// import { fileURLToPath } from 'url'

// const dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('vite').UserConfig} */
const config = {
	/*resolve: {
		alias: {
			src: path.resolve(dirname, './src'),
			'~': path.resolve(dirname),
		},
	},*/
	plugins: [sveltekit()/*, {
		name: 'vite-plugin-babel',
		config(config, config_env) {
			return {
				build: {
					rollupOptions: {
						plugins: [
							babel.default({
								configFile: path.resolve(__dirname, '.babelrc.cjs'), // enable babel for node_modules
								extensions: ['', '.ts', '.js', '.cjs', '.mjs', '.svelte', '.html'],
								babelHelpers: 'runtime',
								exclude : [*/
									// '**/node_modules/@babel/**',
									// '**/node_modules/core-js*/**',
									// '**/.svelte-kit/runtime/server/**',
								/*]
							})
						]
					}
				}
			}
		}
	}*/],
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@use "src/variables.scss" as *;',
			}
		}
	}
}

export default config