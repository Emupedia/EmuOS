const clickOutside = (el, _options = {}) => {
	const options = { include: [], onClickOutside: () => {}, ..._options }

	const handleClick = e => {
		console.log('clickOutside')
		if (el && (!el.contains(e.target) || !e.composedPath().includes(el) || options.include.some(i => e.target.isSameNode(i))) && !e.defaultPrevented) {
			el.dispatchEvent(new CustomEvent('clickOutside', { detail: el }))

			if (typeof options.onClickOutside === 'function') {
				options.onClickOutside()
			}
		}
	}

	document.addEventListener('click', handleClick, { passive: true, capture: true })

	return {
		destroy: () => document.removeEventListener('click', handleClick)
	}
}

export default clickOutside
export { clickOutside }