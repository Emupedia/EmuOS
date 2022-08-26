// noinspection JSUnusedGlobalSymbols

// From svelte-writable-derived
// https://github.com/PixievoltNo1/svelte-writable-derived/blob/master/index.mjs

import { derived, get } from 'svelte/store'

/**
 * @external Store
 * @see [Svelte stores](https://svelte.dev/docs#component-format-script-4-prefix-stores-with-$-to-access-their-values-store-contract)
 */

/**
 * Create a store similar to [Svelte's `derived`](https://svelte.dev/docs#run-time-svelte-store-writable),
 * but which has its own `set` and `update` methods and can send values back to the origin stores.
 * [Read more...](https://github.com/PixievoltNo1/svelte-writable-derived#default-export-writablederived)
 *
 * @param {object} origins One or more stores to derive from. Same as
 * [`derived`](https://svelte.dev/docs#run-time-svelte-store-writable)'s 1st parameter.
 * @param {!Function} derive The callback to determine the derived value. Same as
 * [`derived`](https://svelte.dev/docs#run-time-svelte-store-writable)'s 2nd parameter.
 * @param {!Function|{withOld: !Function}} reflect Called when the
 * derived store gets a new value via its `set` or `update` methods, and determines new values for
 * the origin stores. [Read more...](https://github.com/PixievoltNo1/svelte-writable-derived#new-parameter-reflect)
 * @param [initial] The new store's initial value. Same as
 * [`derived`](https://svelte.dev/docs#run-time-svelte-store-writable)'s 3rd parameter.
 *
 * @returns {object} A writable store.
 */
export function writableDerived(origins, derive, reflect, initial) {
	let childDerivedSetter, originValues, blockNextDerive = false

	let reflectOldValues = 'withOld' in reflect

	let wrappedDerive = (got, set) => {
		childDerivedSetter = set

		if (reflectOldValues) {
			originValues = got
		}

		if (!blockNextDerive) {
			let returned = derive(got, set)

			if (derive.length < 2) {
				set(returned)
			} else {
				return returned
			}
		}

		blockNextDerive = false
	}

	let childDerived = derived(origins, wrappedDerive, initial)

	let singleOrigin = !Array.isArray(origins)

	let sendUpstream = setWith => {
		if (singleOrigin) {
			blockNextDerive = true
			origins.set(setWith)
		} else {
			setWith.forEach((value, i) => {
				blockNextDerive = true
				origins[i].set(value)
			})
		}

		blockNextDerive = false
	}

	if (reflectOldValues) {
		reflect = reflect.withOld
	}

	let reflectIsAsync = reflect.length >= (reflectOldValues ? 3 : 2)

	let cleanup = null

	function doReflect(reflecting) {
		if (typeof cleanup === 'function') {
			cleanup()
			cleanup = null
		}

		let returned

		if (reflectOldValues) {
			returned = reflect(reflecting, originValues, sendUpstream)
		} else {
			returned = reflect(reflecting, sendUpstream)
		}

		if (reflectIsAsync) {
			if (typeof returned === 'function') {
				cleanup = returned
			}
		} else {
			sendUpstream(returned)
		}
	}

	let tryingSet = false

	function update(fn) {
		let isUpdated, mutatedBySubscriptions, oldValue, newValue

		if (tryingSet) {
			newValue = fn(get(childDerived))
			childDerivedSetter(newValue)

			return
		}

		let unsubscribe = childDerived.subscribe(value => {
			if (!tryingSet) {
				oldValue = value
			} else if (!isUpdated) {
				isUpdated = true
			} else {
				mutatedBySubscriptions = true
			}
		})

		newValue = fn(oldValue)
		tryingSet = true
		childDerivedSetter(newValue)
		unsubscribe()
		tryingSet = false

		if (mutatedBySubscriptions) {
			newValue = get(childDerived)
		}

		if (isUpdated) {
			doReflect(newValue)
		}
	}

	return {
		subscribe: childDerived.subscribe,
		set(value) { update( () => value ) },
		update
	}
}

/**
 * Create a store for a property value in an object contained in another store.
 * [Read more...](https://github.com/PixievoltNo1/svelte-writable-derived#named-export-propertystore)
 *
 * @param {object} origin The store containing the object to get/set from.
 * @param {string|number|symbol|Array<string|number|symbol>} propName The property to get/set, or a path of
 * properties in nested objects.
 *
 * @returns {object} A writable store.
 */
export function propertyStore(origin, propName) {
	if (!Array.isArray(propName)) {
		return writableDerived(origin, object => object[propName], { withOld(reflecting, object) {
			object[propName] = reflecting

			return object
		}})
	} else {
		let props = propName.concat()

		return writableDerived(origin, value => {
			for (let i = 0; i < props.length; ++i) {
				value = value[ props[i] ]
			}

			return value
		} , { withOld(reflecting, object) {
			let target = object

			for (let i = 0; i < props.length - 1; ++i) {
				target = target[props[i]]
			}

			target[props[props.length - 1]] = reflecting

			return object
		}})
	}
}