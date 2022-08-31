import { error } from '@sveltejs/kit'
import { variables } from '$lib/variables'

// noinspection JSUnusedLocalSymbols
export const load = async e => {
	if (variables?.GLOBAL_DEBUG) {
		console.log('bsod/+page.js')
	}

	throw error(500, 'BSOD')
}