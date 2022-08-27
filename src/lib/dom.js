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

export const addUnits = val => {
	val = val?.toString() || 0

	if (typeof val === 'string' && val !== '') {
		if (val !== 'max-content' && val !== 'min-content' && val !== 'auto' && val !== 'inherit' && val !== 'initial' && val !== 'revert' && val !== 'revert-layer' && val !== 'unset' && !val.startsWith('fit-content') && !val.endsWith('cm') && !val.endsWith('mm') && !val.endsWith('Q') && !val.endsWith('in') && !val.endsWith('pc') && !val.endsWith('pt') && !val.endsWith('px') && !val.endsWith('em') && !val.endsWith('ex') && !val.endsWith('ch') && !val.endsWith('rem') && !val.endsWith('lh') && !val.endsWith('rlh') && !val.endsWith('vw') && !val.endsWith('vh') && !val.endsWith('vmin') && !val.endsWith('vmax') && !val.endsWith('vb') && !val.endsWith('vi') && !val.endsWith('svw') && !val.endsWith('svh') && !val.endsWith('lvw') && !val.endsWith('lvh')	&& !val.endsWith('dvw') && !val.endsWith('dvh')) {
			val += 'px'
		}
	}


	return val
}