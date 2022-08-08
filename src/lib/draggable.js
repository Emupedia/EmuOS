// noinspection DuplicatedCode

import interact from 'interactjs'

export const draggable = (el, options) => {
	const parseAxis = target => axis => parseFloat(getComputedStyle(target).getPropertyValue(`--${axis}`))

	const move = target => (x, y) => {
		target.style.setProperty('--x', x + 'px')
		target.style.setProperty('--y', y + 'px')
	}

	// noinspection JSCheckFunctionSignatures
	interact(el).draggable({
		allowFrom: options.handle,
		ignoreFrom: options.ignore,
		listeners: {
			move: e => {
				const { target, dx, dy } = e
				const x = (parseAxis(target)('x') || 0) + dx
				const y = (parseAxis(target)('y') || 0) + dy

				move(target)(x, y)
			}
		},
		modifiers: [
			interact.modifiers.restrict({
				restriction: 'parent',
				elementRect: {
					top: 0,
					left: 0,
					bottom: 1,
					right: 1
				},
				endOnly: false
			})
		],
		inertia: false,
	})

	return el
}