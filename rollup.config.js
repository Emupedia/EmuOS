import svelte from 'rollup-plugin-svelte-hot'
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import hmr from 'rollup-plugin-hot'
import autoPreprocess from 'svelte-preprocess'

const spa = true;
const nollup = !!process.env.NOLLUP
const watch = !!process.env.ROLLUP_WATCH
const useLiveReload = !!process.env.LIVERELOAD
const dev = watch || useLiveReload
const production = !dev
const hot = watch && !useLiveReload

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
			hot: hot && {
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
			babelHelpers: 'runtime',
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
		dev && !nollup && serve(),
		useLiveReload && livereload('docs'),
		production && terser(),
		hot && hmr({
			public: 'docs',
			inMemory: true,
			compatModuleHot: !hot
		}),
	],
	watch: {
		clearScreen: false
	}
};

function serve() {
	let started = false
	return {
		name: 'svelte/template:serve',
		writeBundle() {
			if (!started) {
				started = true
				const flags = ['run', 'start', '--', '--dev']

				if (spa) {
					flags.push('--single')
				}

				require('child_process').spawn('npm', flags, {
					stdio: ['ignore', 'inherit', 'inherit'],
					shell: true
				})
			}
		}
	}
}