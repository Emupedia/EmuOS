// noinspection JSUnusedGlobalSymbols

// import ESSerializer from 'esserializer'
import { get as getCookie, set as setCookie, erase as removeCookie } from 'browser-cookies'
import { get, set, createStore, del } from 'idb-keyval'

/**
 * Disabled warnings about missing/unavailable storages
 */
export function disableWarnings() { noWarnings = true }

/**
 * If set to true, no warning will be emitted if the requested Storage is not found.
 * This option can be useful when the lib is used on a server.
 */
let noWarnings = false

/**
 * List of storages where the warning have already been displayed.
 */
const alreadyWarnFor = []

/**
 * Add a log to indicate that the requested Storage have not been found.
 */
const warnStorageNotFound = storageName => {
	const isProduction = typeof process !== 'undefined' && process.env?.NODE_ENV === 'production'

	if (!noWarnings && alreadyWarnFor.indexOf(storageName) === -1 && !isProduction) {
		let message = `Unable to find the ${storageName}. No data will be persisted.`

		if (typeof window === 'undefined') {
			message += '\n' + 'Are you running on a server? Most of storages are not available while running on a server.'
		}

		console.warn(message)
		alreadyWarnFor.push(storageName)
	}
}

const allowedClasses = []

/**
 * Add a class to the allowed list of classes to be serialized
 */
export const addSerializableClass = classDef => { allowedClasses.push(classDef) }
// const serialize = value => ESSerializer.serialize(value)
const serialize = value => JSON.stringify(value)
const deserialize = value => {
	// @TODO: to remove in the next major
	if (value === 'undefined') {
		return undefined
	}

	if (value !== null && value !== undefined) {
		/*try {
			return ESSerializer.deserialize(value, allowedClasses)
		} catch (e) {
			// Do nothing
			// use the value "as is"
		}*/
		try {
			return JSON.parse(value)
		} catch (e) {
			// Do nothing
			// use the value "as is"
		}
	}
	return value
}

/**
 * Make a store persistent
 */
export function persist(store , storage, key) {
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
 */
export function localStorage(listenExternalChanges = false) {
	if (typeof window !== 'undefined' && window?.localStorage) {
		return getBrowserStorage(window.localStorage, listenExternalChanges)
	}

	warnStorageNotFound('window.localStorage')

	return noopStorage()
}

/**
 * Storage implementation that use the browser session storage
 */
export function sessionStorage(listenExternalChanges = false) {
	if (typeof window !== 'undefined' && window?.sessionStorage) {
		return getBrowserStorage(window.sessionStorage, listenExternalChanges)
	}

	warnStorageNotFound('window.sessionStorage')

	return noopStorage()
}

/**
 * Storage implementation that use the browser cookies
 */
export function cookieStorage() {
	if (typeof document === 'undefined' || typeof document?.cookie !== 'string') {
		warnStorageNotFound('document.cookies')

		return noopStorage()
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
			setCookie(key, serialize(value),{ samesite: 'Strict' })
		}
	}
}

/**
 * Storage implementation that use the browser IndexedDB
 */
export function indexedDBStorage() {
	if (typeof indexedDB !== 'object' || typeof window === 'undefined' || typeof window?.indexedDB !== 'object') {
		warnStorageNotFound('IndexedDB')

		return noopSelfUpdateStorage()
	}

	const database = createStore('persist', 'persist')
	const listeners = []
	const listenerFunction = (eventKey, newValue) => {
		if (newValue === undefined) {
			return
		}

		listeners.filter(({key}) => key === eventKey).forEach(({listener}) => listener(newValue))
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
			get(key, database).then(value => listenerFunction(key, (deserialize(value))))

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

/**
 * Storage implementation that do nothing
 */
export function noopStorage() {
	return {
		getValue() {
			return null
		},
		deleteValue() {},
		setValue() {}
	}
}

function noopSelfUpdateStorage() {
	return {
		addListener() {},
		removeListener() {},
		getValue() {
			return null
		},
		deleteValue() {},
		setValue() {}
	}
}