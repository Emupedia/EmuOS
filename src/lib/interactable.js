// noinspection DuplicatedCode

import interact from 'interactjs'
import { getFirst, getAll, addClass, removeClass } from '$lib/dom'

export const interactable = (el, options) => {
	const parseAxis = target => axis => parseFloat(getComputedStyle(target).getPropertyValue(`--${axis}`))

	const move = target => (x, y) => {
		target.style.setProperty('--x', x + 'px')
		target.style.setProperty('--y', y + 'px')

		return target
	}

	let ghostElement

	// noinspection JSCheckFunctionSignatures
	interact(el).draggable({
		listeners: {
			start: e => {
				const { target } = e
				const items = getAll('.selected')

				if (options.useGhost) {
					ghostElement = target.cloneNode(true)
					ghostElement.style.left = target.offsetLeft
					ghostElement.style.top = target.offsetTop
					addClass(ghostElement, 'ghost')
					addClass(ghostElement, 'dragging')
					const container = getFirst('.icons')
					container?.appendChild(ghostElement)
				} else {
					if (items.length > 0) {
						for (const item of items) {
							addClass(item, 'dragging')
						}
					} else {
						addClass(target, 'dragging')
					}
				}
			},
			move: e => {
				let target = e.target
				const items = getAll('.selected')

				if (options.useGhost && ghostElement) {
					target = ghostElement
				}

				if (items.length > 0) {
					for (const item of items) {
						const x = (parseAxis(item)('x') || 0) + e.dx
						const y = (parseAxis(item)('y') || 0) + e.dy

						move(item)(x, y)
					}
				} else {
					const x = (parseAxis(target)('x') || 0) + e.dx
					const y = (parseAxis(target)('y') || 0) + e.dy

					move(target)(x, y)
				}
			},
			end: e => {
				const { target } = e
				const items = getAll('.selected')

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

	return el
}