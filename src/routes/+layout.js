// import { redirect, error } from '@sveltejs/kit'

import { variables } from '$lib/variables'

export const load = async (e) => {
	if (variables.GLOBAL_DEBUG) {
		console.log('+layout.js')
		console.log(e)
		// console.log(redirect)
		// console.log(error)
	}
}