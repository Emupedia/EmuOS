import sirv from 'sirv'
import polka from 'polka'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import json from 'rollup-plugin-json'
import { terser } from 'rollup-plugin-terser'
import babel  from 'rollup-plugin-babel'
import svelte from 'rollup-plugin-svelte-hot'
import hmr from 'rollup-plugin-hot'
// import autoPreprocess from 'svelte-preprocess'

const dev = !!process.env.ROLLUP_WATCH

// noinspection JSUnusedGlobalSymbols,JSCheckFunctionSignatures
export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		exports: 'named',
		format: 'iife',
		name: 'App',
		file: 'docs/assets/js/main.min.js'
	},
	plugins: [
		svelte({
			dev: dev,
			css: css => {
				// noinspection JSCheckFunctionSignatures
				css.write('docs/assets/css/main.min.css')
			},
			// preprocess: autoPreprocess(),
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
		json({
			preferConst: true,
			compact: true,
			namedExports: true
		}),
		dev && replace({
			dev: dev,
		}),
		!dev && babel({
			env: {
				development : {
					compact: false
				}
			},
			runtimeHelpers: true,
			extensions: ['.js', '.mjs', '.html', '.svelte'],
			exclude: ['node_modules/@babel/**', /\/core-js\//],
			presets: [
				['@babel/preset-env', {
					targets: {
						ie: '11'
					},
					useBuiltIns: 'usage',
					corejs: 3
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
		!dev && terser()
	],
	watch: {
		clearScreen: false
	}
}