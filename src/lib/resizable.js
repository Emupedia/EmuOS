// noinspection DuplicatedCode

import interact from 'interactjs'

export const resizable = (el, options) => {
	const parseAxis = target => axis => parseFloat(getComputedStyle(target).getPropertyValue(`--${axis}`))

	const move = target => (x, y) => {
		target.style.setProperty('--x', x + 'px')
		target.style.setProperty('--y', y + 'px')
	}

	const resize = target => (width, height) => {
		target.style.setProperty('--width', width + 'px')
		target.style.setProperty('--height', height + 'px')
	}

	// noinspection JSCheckFunctionSignatures,JSUnresolvedVariable
	interact(el).resizable({
		// edges: { top: options.handles.top, left: options.handles.left, right: options.handles.right, bottom: options.handles.bottom },
		edges: { top: true, left: true, right: true, bottom: true },
		margin: 3,
		listeners: {
			move: e => {
				const { target } = e
				const x = (parseAxis(target)('x') || 0) + e.deltaRect.left
				const y = (parseAxis(target)('y') || 0) + e.deltaRect.top

				move(target)(x, y)
				resize(target)(e.rect.width, e.rect.height)
			}
		},
		modifiers: [
			interact.modifiers.restrictEdges({ outer: 'parent' }),
			interact.modifiers.restrictSize({ min: { width: options.minWidth, height: options.minHeight } })
		],
		inertia: false
	})

	return el
}