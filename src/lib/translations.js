import { derived } from 'svelte/store'

// noinspection ES6UnusedImports
import { db } from '$lib/stores'

import en from '$lib/assets/i18n/en'
import ro from '$lib/assets/i18n/ro'

const translations = { en, ro }

export const locales = Object.keys(translations)

function translate(locale = 'en', key, vars) {
	const splitKey = key.split('.')

	let newKeys = { ...translations[locale] }

	splitKey.forEach(item => {
		if (newKeys) newKeys = newKeys[item]
	})

	if (!key) console.error('No key provided to $t()')

	if (!locale) console.error(`No translation for key "${key}"`)

	let text = newKeys

	if (!text) {
		console.error(`No translation found for ${locale}.${key}`)
		text = `MISSING TRANSLATION ${locale}.${key}`
	}

	Object.keys(vars).map(k => {
		const regex = new RegExp(`{{${k}}}`, 'g')
		text = text.replace(regex, vars[k])
	})

	return text
}

// noinspection JSUnresolvedVariable
export const t = derived(db,$db => (key, vars = {}) => translate($db.locale, key, vars))