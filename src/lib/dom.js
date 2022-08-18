// noinspection JSUnusedGlobalSymbols

export function getFirst(selector) {
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

export function getAll(selector) {
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

export function on(el, eventName, eventHandler) {
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

export function hasClass(el, className) {
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

export function addClass(el, className) {
	if (el.classList) {
		el.classList.add(className)
	} else {
		if (!el.className.match(new RegExp(`(?:^|\\s)${className}(?!\\S)`))) {
			el.className += ` ${className}`
		}
	}
}

export function removeClass(el, className) {
	if (el.classList) {
		el.classList.remove(className)
	} else {
		el.className = el.className.replace(new RegExp(`(?:^|\\s)${className}(?!\\S)`, 'g'), '')
	}
}

export function isInBounds(obj1, obj2) {
	const a = obj1.getBoundingClientRect()
	const b = obj2.getBoundingClientRect()

	return (a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y)
}

export function getOffset(el) {
	let position = el.getBoundingClientRect()

	return { left: position.left + window.scrollX, top: position.top + window.scrollY }
}