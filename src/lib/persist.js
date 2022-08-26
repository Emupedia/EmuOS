// noinspection JSUnusedGlobalSymbols

// Converted @macfja/svelte-persistent-store to plain JS from Typescript
// https://github.com/MacFJA/svelte-persistent-store/blob/main/src/index.ts

// import ESSerializer from 'esserializer'
// import { serialize, deserialize, addGlobalAllowedClass } from '@macfja/serializer'
import { get as getCookie, set as setCookie, erase as removeCookie } from 'browser-cookies'
import { get, set, createStore, del } from 'idb-keyval'
// import Cyrup from 'cyrup'

/**
 * The behavior when no encryption library is available when requesting an encrypted storage
 */
export const NO_ENCRYPTION_BEHAVIOR = {
	/**
	 * Throw an exception
	 */
	EXCEPTION: 0,
	/**
	 * Use the wrapped Storage as-is
	 */
	NO_ENCRYPTION: 1,
	/**
	 * Don't use any storage, so no not encrypted data will be persisted
	 */
	NO_STORAGE: 2
}

/**
 * Disabled warnings about missing/unavailable storages
 */
export function disableWarnings() { noWarnings = true }

/**
 * Set the behavior when no encryption library is available when requesting an encrypted storage
 * @param behavior
 */
// export function noEncryptionBehavior(behavior) { noEncryptionMode = behavior }

/**
 * If set to true, no warning will be emitted if the requested Storage is not found.
 * This option can be useful when the lib is used on a server.
 */
let noWarnings = true
/**
 * The chosen behavior when no encryption library is available
 */
// let noEncryptionMode = NO_ENCRYPTION_BEHAVIOR.EXCEPTION

/**
 * List of storages where the warning have already been displayed.
 */
const alreadyWarnFor = []

const warnUser = message => {
	const isProduction = (typeof process !== 'undefined' && process.env?.NODE_ENV === 'production')

	if (!noWarnings && alreadyWarnFor.indexOf(message) === -1 && !isProduction) {
		if (typeof window === 'undefined') {
			message += '\n' + 'Are you running on a server? Most of storages are not available while running on a server.'
		}

		console.warn(message)
		alreadyWarnFor.push(message)
	}
}

/**
 * Add a log to indicate that the requested Storage have not been found.
 * @param {string} storageName
 */
const warnStorageNotFound = storageName => {
	warnUser(`Unable to find the ${storageName}. No data will be persisted.`)
}

/*
/**
 * Add a class to the allowed list of classes to be serialized
 * @param classDef The class to add to the list
 */
/*export const addSerializableClass = classDef => { addGlobalAllowedClass(classDef) }*/

// const serialize = value => ESSerializer.serialize(value)
const serialize = data => {
	if (typeof data === 'undefined') {
		return 'undefined'
	}

	return JSON.stringify(data)
}

const deserialize = text => {
	if (typeof text !== 'string') {
		return text
	}

	if (text === 'undefined') {
		return undefined
	}

	if (text !== null && text !== undefined) {
		/*try {
			return ESSerializer.deserialize(value, allowedClasses)
		} catch (e) {
			// Do nothing
			// use the value "as is"
		}*/
		try {
			return JSON.parse(text)
		} catch (e) {
			// Do nothing
			// use the value "as is"
		}
	}

	return text
}

/**
 * Make a store persistent
 * @param {object} store The store to enhance
 * @param {object} storage The storage to use
 * @param {string} key The name of the data key
 */
export function persist(store, storage, key) {
	const initialValue = storage.getValue(key)

	if (null !== initialValue) {
		store.set(initialValue)
	}

	if (storage.addListener) {
		storage.addListener(key, newValue => {
			store.set(newValue)
		})
	}

	store.subscribe(value => {
		storage.setValue(key, value)
	})

	return {
		...store,
		delete() {
			storage.deleteValue(key)
		}
	}
}

const sharedCookieStorage = createCookieStorage(), sharedLocalStorage = createLocalStorage(), sharedSessionStorage = createSessionStorage()

/**
 * Persist a store into a cookie
 * @param {object} store The store to enhance
 * @param {string} cookieName The name of the cookie
 */
export function persistCookie(store, cookieName) {
	return persist(store, sharedCookieStorage, cookieName)
}

/**
 * Persist a store into the browser session storage
 * @param {object} store The store to enhance
 * @param {string} key The name of the key in the browser session storage
 */
export function persistBrowserSession(store, key) {
	return persist(store, sharedSessionStorage, key)
}

/**
 * Persist a store into the browser local storage
 * @param {object} store The store to enhance
 * @param {string} key The name of the key in the browser local storage
 */
export function persistBrowserLocal(store, key) {
	return persist(store, sharedLocalStorage, key)
}

function getBrowserStorage(browserStorage, listenExternalChanges = false) {
	const listeners = []

	const listenerFunction = event => {
		const eventKey = event.key

		if (event.storageArea === browserStorage) {
			listeners.filter(({ key }) => key === eventKey).forEach(({ listener }) => {
				listener(deserialize(event.newValue))
			})
		}
	}

	const connect = () => {
		if (listenExternalChanges && typeof window !== 'undefined' && window?.addEventListener) {
			window.addEventListener('storage', listenerFunction)
		}
	}

	const disconnect = () => {
		if (listenExternalChanges && typeof window !== 'undefined' && window?.removeEventListener) {
			window.removeEventListener('storage', listenerFunction)
		}
	}

	return {
		addListener(key, listener) {
			listeners.push({key, listener})

			if (listeners.length === 1) {
				connect()
			}
		},
		removeListener(key, listener) {
			const index = listeners.indexOf({key, listener})

			if (index !== -1) {
				listeners.splice(index, 1)
			}

			if (listeners.length === 0) {
				disconnect()
			}
		},
		getValue(key) {
			const value = browserStorage.getItem(key)

			return deserialize(value)
		},
		deleteValue(key) {
			browserStorage.removeItem(key)
		},
		setValue(key, value) {
			browserStorage.setItem(key, serialize(value))
		}
	}
}

/**
 * Storage implementation that use the browser local storage
 * @param {boolean} listenExternalChanges Update the store if the localStorage is updated from another page
 */
export function createLocalStorage(listenExternalChanges = false) {
	if (typeof window !== 'undefined' && window?.localStorage) {
		return getBrowserStorage(window.localStorage, listenExternalChanges)
	}

	warnStorageNotFound('window.localStorage')

	return createNoopStorage()
}

/**
 * Storage implementation that use the browser session storage
 * @param {boolean} listenExternalChanges Update the store if the sessionStorage is updated from another page
 */
export function createSessionStorage(listenExternalChanges = false) {
	if (typeof window !== 'undefined' && window?.sessionStorage) {
		return getBrowserStorage(window.sessionStorage, listenExternalChanges)
	}

	warnStorageNotFound('window.sessionStorage')

	return createNoopStorage()
}

/**
 * Storage implementation that use the browser cookies
 */
export function createCookieStorage() {
	if (typeof document === 'undefined' || typeof document?.cookie !== 'string') {

		warnStorageNotFound('document.cookies')

		return createNoopStorage()
	}

	return {
		getValue(key) {
			const value = getCookie(key)

			return deserialize(value)
		},
		deleteValue(key) {
			removeCookie(key, { samesite: 'Strict' })
		},
		setValue(key, value) {
			setCookie(key, serialize(value), { samesite: 'Strict' })
		}
	}
}

/**
 * Storage implementation that use the browser IndexedDB
 */
export function createIndexedDBStorage() {
	if (typeof indexedDB !== 'object' || typeof window === 'undefined' || typeof window?.indexedDB !== 'object') {
		warnStorageNotFound('IndexedDB')

		return createNoopSelfUpdateStorage()
	}

	const database = createStore('svelte-persist', 'persist')
	const listeners = []

	const listenerFunction = (eventKey, newValue) => {
		if (newValue === undefined) {
			return
		}

		listeners.filter(({ key }) => key === eventKey).forEach(({ listener }) => listener(newValue))
	}

	return {
		addListener(key, listener) {
			listeners.push({key, listener})
		},
		removeListener(key, listener) {
			const index = listeners.indexOf({key, listener})

			if (index !== -1) {
				listeners.splice(index, 1)
			}
		},
		getValue(key) {
			get(key, database).then(value => listenerFunction(key, deserialize(value)))

			return null
		},
		setValue(key, value) {
			// noinspection JSIgnoredPromiseFromCall
			set(key, serialize(value), database)
		},
		deleteValue(key) {
			// noinspection JSIgnoredPromiseFromCall
			del(key, database)
		}
	}
}

/*/**
 * Add encryption layer on a storage
 * @param wrapped The storage to enhance
 * @param encryptionKey The encryption key to use on key and data
 */
/*export function createEncryptedStorage(wrapped, encryptionKey) {
	if (typeof window === 'undefined' || typeof window?.crypto !== 'object' || typeof window?.crypto?.subtle !== 'object') {
		switch (noEncryptionMode) {
			case NO_ENCRYPTION_BEHAVIOR.NO_STORAGE:
				warnUser('Unable to find the encryption library. No data will be persisted.')
				return createNoopStorage()
			case NO_ENCRYPTION_BEHAVIOR.NO_ENCRYPTION:
				warnUser('Unable to find the encryption library. Data will not be encrypted.')
				return wrapped
			case NO_ENCRYPTION_BEHAVIOR.EXCEPTION:
			default:
				throw new Error('Unable to find the encryption library.')
		}
	}

	const listeners = []

	const listenerFunction = (eventKey, newValue) => {
		if (newValue === undefined) {
			return
		}

		listeners.filter(({ key }) => key === eventKey).forEach(({ listener }) => listener(newValue))
	}

	return {
		addListener(key, listener) {
			listeners.push({key, listener})
		},
		removeListener(key, listener) {
			const index = listeners.indexOf({key, listener})

			if (index !== -1) {
				listeners.splice(index, 1)
			}
		},
		getValue(key) {
			Cyrup.encrypt(key, encryptionKey, null, 'sps').then(encryptedKey => {
				const storageValue = wrapped.getValue(encryptedKey)

				if (storageValue === null) return undefined

				return Cyrup.decrypt(storageValue, encryptionKey)
			}).then(decryptedData => listenerFunction(key, deserialize(decryptedData)))

			return null
		},
		setValue(key, value) {
			Cyrup.encrypt(key, encryptionKey, null, 'sps').then(encryptedKey => Cyrup.encrypt(serialize(value), encryptionKey, null, 'sps').then(encryptedData => wrapped.setValue(encryptedKey, encryptedData)))
		},
		deleteValue(key) {
			Cyrup.encrypt(key, encryptionKey, null, 'sps').then(encryptedKey => wrapped.deleteValue(encryptedKey))
		}
	}
}*/

/**
 * Storage implementation that do nothing
 */
export function createNoopStorage() {
	return {
		getValue() {
			return null
		},
		deleteValue() {
			// Do nothing
		},
		setValue() {
			// Do nothing
		}
	}
}

function createNoopSelfUpdateStorage() {
	return {
		addListener() {
			// Do nothing
		},
		removeListener() {
			// Do nothing
		},
		getValue() {
			return null
		},
		deleteValue() {
			// Do nothing
		},
		setValue() {
			// Do nothing
		}
	}
}