// noinspection JSUnusedGlobalSymbols

import iconsData from '$lib/data/icons?raw'

let icons = {}

try {
	icons = JSON.parse(iconsData)
} catch (err) {
	console.error(err)
}

export { icons }