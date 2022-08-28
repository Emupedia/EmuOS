// noinspection DuplicatedCode

import { createRequire } from 'module'
import { resolve } from 'path'

const require		= createRequire(import.meta.url)
const fs			= require('fs')
const replace		= require('replace-in-file')

let fixjekyll		= process.argv.indexOf('-fixjekyll') > -1
let fixneutralino	= process.argv.indexOf('-fixneutralino') > -1

try {
	let path = 'docs'

	if (fixneutralino) {
		path = '.svelte-kit/neutralino/build'
	}

	process.chdir(path)

	const manifest = require(resolve(`vite-manifest.json`))

	fs.access(resolve('404.html'), error => {
		if (!error) {
			fs.unlinkSync(resolve('404.html'))
		}
	})

	fs.symlink(`index.html`, `404.html`, error => {
		if (error) {
			console.error(`Error occurred: ${error}`)
		} else {

			if (fixjekyll) {
				console.log('Fixed Jekyll')

				// noinspection JSUnusedLocalSymbols
				for (const [key, entry] of Object.entries(manifest)) {
					if (key.endsWith('start.js')) {
						// noinspection JSValidateTypes
						replace({
							files: resolve(entry.file),
							from: /_{1,2}(layout|error)/g,
							to: '$1'
						}, error => {
							if (error) {
								console.error(`Error occurred: ${error}`)
							} else {
								// noinspection JSValidateTypes
								replace({
									files: resolve('service-worker.js'),
									from: /_{1,2}(layout|error)/g,
									to: '$1'
								}, error => {
									if (error) {
										console.error(`Error occurred: ${error}`)
									} else {
										// noinspection JSValidateTypes
										replace({
											files: resolve(entry.file),
											from: /\+(layout|page)/g,
											to: '$1'
										}, error => {
											if (error) {
												console.error(`Error occurred: ${error}`)
											}
										})
									}
								})
							}
						})
					}

					if (entry.file.includes('__') || entry.file.includes('_')) {
						fs.access(resolve(entry.file), error => {
							if (!error) {
								fs.rename(resolve(entry.file), entry.file.replaceAll('__', '').replaceAll('_', ''), error => {
									if (error) {
										console.error(`Error occurred: ${error}`)
									} else {
										fs.rename(resolve(entry.file + '.map'), entry.file.replaceAll('__', '').replaceAll('_', '') + '.map', error => {
											if (error) {
												console.error(`Error occurred: ${error}`)
											}
										})
									}
								})
							}
						})
					}

					if (Array.isArray(entry.css)) {
						entry.css.forEach(css => {
							if (css.includes('+')) {
								fs.access(resolve(css), error => {
									if (!error) {
										fs.rename(resolve(css), css.replaceAll('+', ''), error => {
											if (error) {
												console.error(`Error occurred: ${error}`)
											}
										})
									}
								})
							}
						})
					}
				}
			}

			if (fixneutralino) {
				console.log('Fixed Neutralinojs')

				// noinspection JSUnusedLocalSymbols
				for (const [key, entry] of Object.entries(manifest)) {
					if (key.endsWith('start.js')) {
						// noinspection JSValidateTypes
						replace({
							files: resolve(entry.file),
							from: /\+(layout|page)/g,
							to: '$1'
						}, error => {
							if (error) {
								console.error(`Error occurred: ${error}`)
							}
						})
					}

					if (Array.isArray(entry.css)) {
						entry.css.forEach(css => {
							if (css.includes('+')) {
								fs.access(resolve(css), error => {
									if (!error) {
										fs.rename(resolve(css), css.replaceAll('+', ''), error => {
											if (error) {
												console.error(`Error occurred: ${error}`)
											}
										})
									}
								})
							}
						})
					}
				}
			}
		}
	})
} catch (error) {
	console.error(`Error occurred: ${error}`)
}

console.log('Finished!')