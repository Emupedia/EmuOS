// From @macfja/svelte-adapter-neutralino
// https://github.com/MacFJA/svelte-adapter-neutralino/blob/main/index.js

import staticAdapter from '@sveltejs/adapter-static'
import { execSync } from 'child_process'
import { join, resolve } from 'path'
import { writeFileSync } from 'fs'
import * as colorette from 'colorette'
import { createColorize } from 'colorize-template'

const c = createColorize(colorette)

/**
 * @typedef {{
 *     "name"?: string,
 *     "applicationId"?: string,
 *     "icon"?: string,
 *     "port"?: number,
 *     "window"?: {
 *         "width"?: number,
 *         "height"?: number,
 *         "minWidth"?: number,
 *         "minHeight"?: number,
 *         "resizable"?: boolean,
 *         "maximize"?: boolean
 *     },
 *     "output"?: string;
 *     "versions": {
 *         "client": string,
 *         "binary": string
 *     }
 * }} AdapterOptions
 */

/** @type {AdapterOptions} */
const defaultOptions = {
	name: 'Svelte Kit',
	applicationId: 'dev.svelte.kit',
	port: 8001,
	icon: 'favicon.png',
	window: {
		width: 800,
		height: 500,
		minWidth: 400,
		minHeight: 200,
		resizable: true,
		maximize: false,
		enableInspector: false
	},
	output: 'build',
	versions: {
		client: '3.6.0',
		binary: '4.7.0'
	}
}

const cliVersion = '^9.3.1'

/**
 * @param {AdapterOptions} options
 */
export default function (options = defaultOptions) {
	return {
		name: 'svelte-adapter-neutralino',

		async adapt(builder) {
			options = { ...defaultOptions, ...options }
			options.window = { ...defaultOptions.window, ...options.window }
			options.versions = { ...defaultOptions.versions, ...options.versions }
			console.log(c`{cyan INFO} Using Neutralinojs with version:`)
			console.log(c`	- Client: {gray ${options.versions.client}}`)
			console.log(c`	- Binary: {gray ${options.versions.binary}}`)
			console.log(c`	- CLI: {gray ${cliVersion}}`)

			const tmpPath = builder.getBuildDirectory('neutralino')
			builder.rimraf(tmpPath)
			builder.mkdirp(join(tmpPath, 'build'))

			writeFileSync(join(tmpPath, 'neutralino.config.json'), JSON.stringify({
				applicationId: options.applicationId,
				defaultMode: 'window',
				port: options.port,
				url: '/',
				documentRoot: 'build/',
				enableServer: true,
				enableNativeAPI: true,
				logging: {
					enabled: true,
					writeToLogFile: true
				},
				nativeBlockList: [],
				modes: {
					window: {
						title: options.name,
						width: options.window.width,
						height: options.window.height,
						minWidth: options.window.minWidth,
						minHeight: options.window.minHeight,
						fullScreen: false,
						alwaysOnTop: false,
						icon: '/build/' + options.icon,
						enableInspector: options.window.enableInspector,
						borderless: false,
						maximize: options.window.maximize,
						hidden: false,
						resizable: options.window.resizable,
						exitProcessOnClose: true
					}
				},
				cli: {
					binaryName: options.name,
					resourcesPath: '/build/',
					extensionsPath: '/',
					clientLibrary: '/build/neutralino.js',
					binaryVersion: options.versions.binary,
					clientVersion: options.versions.client
				}
			}))

			console.log(c`{yellow Building} Generating static build`)

			const adapter = new staticAdapter({
				pages: join(tmpPath, 'build'),
				fallback: 'index.html'
			})

			await adapter.adapt(builder)

			console.log(c`{yellow Patching} Patching Neutralinojs filenames`)
			console.log(execSync(`npm run post:build -- -fixneutralino`, { cwd: tmpPath }).toString('utf8'))
			console.log(c`{yellow Building} Downloading Neutralinojs dependencies`)
			console.log(execSync(`npx --quiet "@neutralinojs/neu@${cliVersion}" update`, { cwd: tmpPath }).toString('utf8'))
			console.log(c`{yellow Building} Building Generating Neutralinojs release`)
			console.log(execSync(`npx --quiet "@neutralinojs/neu@${cliVersion}" build --release`, { cwd: tmpPath }).toString('utf8'))

			console.log(c`{yellow Building} Finalising...`)
			builder.mkdirp(options.output)
			builder.copy(join(tmpPath, 'dist') + '/.', options.output)

			console.log(c`{green Success} Application is available in {cyan ${resolve(options.output)}}`)
		}
	}
}