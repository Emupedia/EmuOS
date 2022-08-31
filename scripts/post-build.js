// noinspection DuplicatedCode

import { resolve } from 'path'
import fs from 'fs-extra'
import replace from 'replace-in-file'

let fixjekyll		= process.argv.indexOf('-fixjekyll') > -1
let fixneutralino	= process.argv.indexOf('-fixneutralino') > -1

try {
	let path = 'docs'

	if (fixneutralino) {
		path = '.svelte-kit/neutralino/build'
	}

	process.chdir(path)

	let manifest

	// noinspection JSUnresolvedFunction
	fs.access(resolve('404.html'), error => {
		if (!error) {
			// noinspection JSUnresolvedFunction
			fs.unlinkSync(resolve('404.html'))
		}
	})

	// noinspection JSUnresolvedFunction
	fs.symlink(`index.html`, `404.html`, error => {
		if (error) {
			console.error(`Error occurred: ${error}`)
		} else {

			if (fixjekyll) {
				console.log('Fixed Jekyll')

				manifest = require(resolve(`vite-manifest.json`))

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
						// noinspection JSUnresolvedFunction
						fs.access(resolve(entry.file), error => {
							if (!error) {
								// noinspection JSUnresolvedFunction
								fs.rename(resolve(entry.file), entry.file.replaceAll('__', '').replaceAll('_', ''), error => {
									if (error) {
										console.error(`Error occurred: ${error}`)
									} else {
										// noinspection JSUnresolvedFunction
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
								// noinspection JSUnresolvedFunction
								fs.access(resolve(css), error => {
									if (!error) {
										// noinspection JSUnresolvedFunction
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

				manifest = require(resolve(`vite-manifest.json`))

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
								// noinspection JSUnresolvedFunction
								fs.access(resolve(css), error => {
									if (!error) {
										// noinspection JSUnresolvedFunction
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

			// noinspection JSUnresolvedFunction
			fs.access(resolve('../components'), error => {
				if (!error) {
					fs.copy(resolve('../components/emuos/components'), resolve('emuos/components'), error => {
						if (error) {
							console.error(error)
						} else {
							// noinspection JSUnresolvedFunction
							fs.access(resolve('../components/components.html'), error => {
								if (!error) {
									fs.copy(resolve('../components/components.html'), resolve('components.html'), error => {
										if (error) {
											console.error(error)
										}
									})
								}
							})
						}
					})
				}
			})
		}
	})
} catch (error) {
	console.error(`Error occurred: ${error}`)
}

console.log('Finished!')