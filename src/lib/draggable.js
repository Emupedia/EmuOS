// noinspection DuplicatedCode

import interact from 'interactjs'

export const draggable = (el, options) => {
	const parseAxis = target => axis => parseFloat(getComputedStyle(target).getPropertyValue(`--${axis}`))

	const move = target => (x, y) => {
		target.style.setProperty('--x', x + 'px')
		target.style.setProperty('--y', y + 'px')
	}

	interact(el).draggable({
		// manualStart : true,
		allowFrom: options.handle,
		modifiers: [
			interact.modifiers.restrict({
				restriction: el.parentNode,
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
		onmove: e => {
			const { target, dx, dy } = e
			const x = (parseAxis(target)('x') || 0) + dx
			const y = (parseAxis(target)('y') || 0) + dy

			move(target)(x, y)
		},
	})
}