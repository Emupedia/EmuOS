// noinspection DuplicatedCode,JSUnusedGlobalSymbols

import interact from 'interactjs'
import { getProperty, move, resize } from '$lib/dom'

export const resizable = (el, options) => {
	interact(el).resizable({
		// edges: { top: options.handles.top, left: options.handles.left, right: options.handles.right, bottom: options.handles.bottom },
		edges: { top: true, left: true, right: true, bottom: true },
		margin: options.margin,
		listeners: {
			move: e => {
				const { target } = e
				const x = (getProperty(target, 'x') || 0) + e.deltaRect.left
				const y = (getProperty(target, 'y') || 0) + e.deltaRect.top

				move(target, x, y)
				resize(target, e.rect.width, e.rect.height)
			}
		},
		modifiers: [
			interact.modifiers.restrictEdges({ outer: 'parent' }),
			interact.modifiers.restrictSize({ min: { width: options.minWidth, height: options.minHeight }, max: 'parent' })
		],
		inertia: false
	})

	return el
}