// noinspection JSUnusedGlobalSymbols

import { variables } from '$lib/variables'

// export const prerender = false
export const ssr = false

export const load = async e => {
	if (variables?.GLOBAL_DEBUG) {
		console.log('+layout.js')
		console.log(e)
	}
}