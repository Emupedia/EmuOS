// noinspection JSUnusedGlobalSymbols

export const getGlobal = () => {
	if (typeof globalThis === 'object' && globalThis) return globalThis
	if (typeof window === 'object' && window) return window
	if (typeof global === 'object' && global) return global
	if (typeof self === 'object' && self) return self

	return (function() { return this; })() || Function('return this')()
}

export const getFirst = selector => {
	if (document.querySelector) {
		return document.querySelector(selector)
	} else {
		if (selector.charAt(0) === '.') {
			if (document.getElementsByClassName) {
				return document.getElementsByClassName(selector.substr(1))[0]
			}
		}

		if (selector.charAt(0) !== '.' && selector.charAt(0) !== '#') {
			if (document.getElementsByTagName) {
				return document.getElementsByTagName(selector)[0]
			}
		}

		if (selector.charAt(0) === '#') {
			if (document.getElementById) {
				return document.getElementById(selector.substr(1))
			}
		}

		return null
	}
}

export const getAll = selector => {
	if (document.querySelectorAll) {
		return document.querySelectorAll(selector)
	} else {
		if (selector.charAt(0) === '.') {
			if (document.getElementsByClassName) {
				return document.getElementsByClassName(selector.substr(1))
			}
		}

		if (selector.charAt(0) !== '.' && selector.charAt(0) !== '#') {
			if (document.getElementsByTagName) {
				return document.getElementsByTagName(selector)
			}
		}

		if (selector.charAt(0) === '#') {
			if (document.getElementById) {
				return document.getElementById(selector.substr(1))
			}
		}

		return null
	}
}

export const on = (el, eventName, eventHandler) => {
	if (el) {
		if (el.addEventListener) {
			el.addEventListener(eventName, eventHandler, false)
		} else {
			// noinspection JSUnresolvedVariable
			if (el.attachEvent) {
				el.attachEvent('on' + eventName, eventHandler)
			}
		}
	}
}

export const hasClass = (el, className) => {
	if (el.classList) {
		if (el.classList.contains(className)) {
			return true
		}
	} else {
		if (el.className.match(new RegExp(`(?:^|\\s)${className}(?!\\S)`))) {
			return true
		}
	}

	return false
}

export const addClass = (el, className) => {
	if (el.classList) {
		el.classList.add(className)
	} else {
		if (!el.className.match(new RegExp(`(?:^|\\s)${className}(?!\\S)`))) {
			el.className += ` ${className}`
		}
	}
}

export const removeClass = (el, className) => {
	if (el.classList) {
		el.classList.remove(className)
	} else {
		el.className = el.className.replace(new RegExp(`(?:^|\\s)${className}(?!\\S)`, 'g'), '')
	}
}

export const isInBounds = (obj1, obj2) => {
	const a = obj1.getBoundingClientRect()
	const b = obj2.getBoundingClientRect()

	return (a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y)
}

export const getOffset = el => {
	const position = el.getBoundingClientRect()

	return { left: position.left + window.scrollX, top: position.top + window.scrollY }
}

export const addUnits = value => {
	value = value?.toString() || 0

	if (typeof value === 'string' && value !== '') {
		if (value !== 'max-content' && value !== 'min-content' && value !== 'auto' && value !== 'inherit' && value !== 'initial' && value !== 'revert' && value !== 'revert-layer' && value !== 'unset' && !value.startsWith('fit-content') && !value.endsWith('cm') && !value.endsWith('mm') && !value.endsWith('Q') && !value.endsWith('in') && !value.endsWith('pc') && !value.endsWith('pt') && !value.endsWith('px') && !value.endsWith('em') && !value.endsWith('ex') && !value.endsWith('ch') && !value.endsWith('rem') && !value.endsWith('lh') && !value.endsWith('rlh') && !value.endsWith('vw') && !value.endsWith('vh') && !value.endsWith('vmin') && !value.endsWith('vmax') && !value.endsWith('vb') && !value.endsWith('vi') && !value.endsWith('svw') && !value.endsWith('svh') && !value.endsWith('lvw') && !value.endsWith('lvh')	&& !value.endsWith('dvw') && !value.endsWith('dvh')) {
			value += 'px'
		}
	}


	return value
}

export const getProperty = (target, property) => parseFloat(getComputedStyle(target)?.getPropertyValue(`--${property}`))

export const setProperty = (target, property, value) => target?.style?.setProperty(`--${property}`, addUnits(value))