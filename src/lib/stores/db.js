// noinspection JSUnusedGlobalSymbols

import { writable } from 'svelte/store'
import { persist, createLocalStorage } from '$lib/stores/persist'
import { icons } from '$lib/data'
import { variables } from '$lib/variables'

const initial = {
	locale: 'en',
	desktop: { icons: icons || [] },
	settings: {},
	version: 0,
	user: null,
	dev: false
}

if (variables?.GLOBAL_DEBUG) {
	console.log(initial)
}

export const db = persist(writable(initial), createLocalStorage(), 'db')