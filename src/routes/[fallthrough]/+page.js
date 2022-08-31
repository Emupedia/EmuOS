import { redirect } from '@sveltejs/kit'
import { variables } from '$lib/variables'

// noinspection JSUnusedLocalSymbols
export const load = async e => {
	if (variables?.GLOBAL_DEBUG) {
		console.log('[fallthrough]/+page.js')
	}

	throw redirect(307, '/')
}