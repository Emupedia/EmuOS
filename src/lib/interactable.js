// noinspection DuplicatedCode

import interact from 'interactjs'
import { get, addClass, removeClass } from '$lib/dom'

export const interactable = el => {
	const parseAxis = target => axis => parseFloat(getComputedStyle(target).getPropertyValue(`--${axis}`))

	const move = target => (x, y) => {
		target.style.setProperty('--x', x + 'px')
		target.style.setProperty('--y', y + 'px')

		return target
	}

	// noinspection JSCheckFunctionSignatures
	interact(el).draggable({
		listeners: {
			start: e => {
				const { target } = e
				const items = get('.selected')

				if (items.length > 0) {
					for (const item of items) {
						addClass(item, 'dragging')
					}
				} else {
					addClass(target, 'dragging')
				}
			},
			move: e => {
				const { target, dx, dy } = e
				const items = get('.selected')

				if (items.length > 0) {
					for (const item of items) {
						const x = (parseAxis(item)('x') || 0) + dx
						const y = (parseAxis(item)('y') || 0) + dy

						move(item)(x, y)
					}
				} else {
					const x = (parseAxis(target)('x') || 0) + dx
					const y = (parseAxis(target)('y') || 0) + dy

					move(target)(x, y)
				}
			},
			end: e => {
				const { target } = e
				const items = get('.selected')

				if (items.length > 0) {
					for (const item of items) {
						removeClass(item, 'dragging')
					}
				} else {
					removeClass(target, 'dragging')
				}
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
		inertia: false
	})
}