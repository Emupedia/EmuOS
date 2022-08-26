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

export const toast = (() => {
	const { subscribe, update } = writable([])

	const defaults = {
		duration: 4000,
		initial: 1,
		next: 0,
		pausable: false,
		dismissable: true,
		reversed: false,
		intro: { x: 256 },
		close: '✕'
	}

	let count = 0

	const options = {}

	const open = (msg, opts = {}) => {
		const param = { target: 'default', ...(msg instanceof Object ? msg : { ...opts, msg }) }

		const conf = options[param.target] || {}

		const entry = {
			...defaults,
			...conf,
			...param,
			theme: { ...conf.theme, ...param.theme },
			classes: [...(conf.classes || []), ...(param.classes || [])],
			id: param.id || ++count
		}

		update(n => {
			const idx = n.findIndex(i => i.id === param.id)

			if (idx === -1) {
				return entry.reversed ? [...n, entry] : [entry, ...n]
			} else if (idx > -1) {
				n[idx] = { ...n[idx], ...entry }
			}

			return n
		})

		return count
	}

	const close = id => {
		update(n => {
			if (!n.length || id === 0) return []

			if (id instanceof Object) return n.filter(i => id(i))

			const target = id || Math.max(...n.map(i => i.id))

			return n.filter(i => i.id !== target)
		})
	}

	const set = (id, opts = {}) => {
		const param = id instanceof Object ? { ...id } : { ...opts, id }

		update(n => {
			const idx = n.findIndex(i => i.id === param.id)

			if (idx > -1) {
				n[idx] = { ...n[idx], ...param }
			}

			return n
		})
	}

	const init = (target = 'default', opts = {}) => {
		options[target] = opts

		return options
	}

	return { subscribe, open, close, set, init }
})()