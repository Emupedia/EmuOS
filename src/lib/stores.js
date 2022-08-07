import { writable } from 'svelte/store'
import { persist, localStorage } from '$lib/persist'

export const db = persist(writable({
	locale: 'en',
	settings: {
	},
	user: null,
	dev: false
}), localStorage(), 'db')