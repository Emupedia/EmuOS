import { createRequire } from 'module'
const require	= createRequire(import.meta.url)
const fs		= require('fs')
const replace	= require('replace-in-file')
const manifest	= require('../docs/manifest.json')

try {
	process.chdir('docs')

	fs.symlink(`index.html`, `404.html`, error => {
		if (error) {
			console.error(`Error occurred: ${error}`)
		} else {
			process.chdir('..')

			// noinspection JSUnusedLocalSymbols
			for (const [key, entry] of Object.entries(manifest)) {
				if (key.endsWith('start.js')) {
					// noinspection JSValidateTypes
					replace({
						files: `docs/${entry.file}`,
						from: /__(layout|error)/g,
						to: '$1'
					}, error => {
						if (error) {
							console.error(`Error occurred: ${error}`)
						} else {
							// noinspection JSValidateTypes
							replace({
								files: `docs/service-worker.js`,
								from: /__(layout|error)/g,
								to: '$1'
							}, error => {
								if (error) {
									console.error(`Error occurred: ${error}`)
								}
							})
						}
					})
				}

				if (entry.file.includes('__')) {
					fs.access(`docs/${entry.file}`, error => {
						if (!error) {
							fs.rename(`docs/${entry.file}`, `docs/${entry.file.replaceAll('__', '')}`, error => {
								if (error) {
									console.error(`Error occurred: ${error}`)
								}
							})
						}
					})
				}
			}
		}
	})
} catch (error) {
	console.error(`Error occurred: ${error}`)
}

console.log('Finished!')