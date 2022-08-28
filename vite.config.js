// noinspection NpmUsedModulesInstalled,JSUnusedLocalSymbols,JSUnusedGlobalSymbols,JSValidateTypes

import { resolve } from 'path'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { sveltekit } from '@sveltejs/kit/vite'
// import legacy from '@vitejs/plugin-legacy'
import 'dotenv/config'

const isDevelopment = process.env.NODE_ENV === 'development'
const isProduction = process.env.NODE_ENV === 'production'
const GlobalDebug = process.env.GLOBAL_DEBUG === 'true'
const BuildComponents = process.env.BUILD_COMPONENTS === 'true'
const BuildWeb = process.env.BUILD_WEBSITE === 'true'
const BuildDesktop = process.env.BUILD_DESKTOP === 'true'

const legacy = () => {}
const useBabel = false
const sourceMapsInProduction = true

/** @type {import('vite').UserConfig} */
const SvelteKitConfig = {
	plugins: [
		sveltekit(),
		useBabel && legacy({
			targets: ['defaults', 'IE 11']
		})
	],
	build: {
		sourcemap: isProduction && sourceMapsInProduction
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@use "src/variables.scss" as *;'
			}
		}
	}
}
/** @type {import('vite').UserConfig} */
const SvelteConfig = {
	publicDir: 'www',
	build: {
		outDir: 'components',
		assetsDir: 'emuos/components',
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'components.html')
			}
		}
	},
	plugins: [
		svelte({
			compilerOptions: {
				customElement: true
			}
		})
	]
}

const config = BuildWeb || BuildDesktop ? SvelteKitConfig : (BuildComponents ? SvelteConfig : {})

export default config