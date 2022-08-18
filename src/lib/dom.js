export function hasClassName(el, className) {
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

export function addClassName(el, className) {
	if (el.classList) {
		el.classList.add(className)
	} else {
		if (!el.className.match(new RegExp(`(?:^|\\s)${className}(?!\\S)`))) {
			el.className += ` ${className}`
		}
	}
}

export function removeClassName(el, className) {
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