import sirv from 'sirv'
import polka from 'polka'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import babel  from 'rollup-plugin-babel'
import svelte from 'rollup-plugin-svelte-hot'
import hmr from 'rollup-plugin-hot'
import autoPreprocess from 'svelte-preprocess'

const dev = !!process.env.ROLLUP_WATCH
const production = !dev

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		exports: 'named',
		format: 'iife',
		name: 'app',
		file: 'docs/assets/js/main.min.js'
	},
	plugins: [
		svelte({
			dev: !production,
			preprocess: autoPreprocess(),
			css: css => {
				css.write('docs/assets/css/main.min.css')
			},
			hot: dev && {
				optimistic: true,
				noPreserveState: true
			}
		}),
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		babel({
			env: {
				development : {
					compact: false
				}
			},
			extensions: ['.js', '.mjs', '.html', '.svelte'],
			//babelHelpers: 'runtime',
			runtimeHelpers: true,
			exclude: ['node_modules/@babel/**'],
			presets: [
				['@babel/preset-env', {
					targets: {
						ie: '11'
					},
				}]
			],
			plugins: [
				'@babel/plugin-syntax-dynamic-import',
				['@babel/plugin-transform-runtime', {
					useESModules: true
				}]
			]
		}),
		dev && (() => {
			polka().use(sirv('docs', {
				dev: true,
				single: true
			})).listen(5000, err => {
				if (err) throw err
				console.log('[HTTP] Listening on localhost:5000')
			})
		})(),
		dev && hmr({
			public: 'docs',
			inMemory: true,
			compatModuleHot: false
		}),
		production && terser()
	],
	watch: {
		clearScreen: false
	}
}