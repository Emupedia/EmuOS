import { redirect, error } from '@sveltejs/kit'

export const load = async () => {
	console.log('+layout.js')
	console.log(redirect)
	console.log(error)
}