// noinspection DuplicatedCode

import interact from 'interactjs'
import { getFirst, getAll, getOffset, addClass, removeClass } from '$lib/dom'

export const interactable = (el, options) => {
	const parseAxis = target => axis => parseFloat(getComputedStyle(target).getPropertyValue(`--${axis}`))

	const move = target => (x, y) => {
		target.style.setProperty('--x', x + 'px')
		target.style.setProperty('--y', y + 'px')

		return target
	}

	let ghostElement
	let offset

	// noinspection JSCheckFunctionSignatures
	interact(el).draggable({
		listeners: {
			start: e => {
				const { target } = e

				let unselect = getAll('.selected')

				for (const item of unselect) {
					removeClass(item, 'selected')
				}

				addClass(target, 'selected')
				const items = getAll('.selected')

				if (options.useGhost) {
					offset = getOffset(target)
					ghostElement = target.cloneNode(true)
					ghostElement.style.setProperty('--x', (offset.left || 0) + 'px')
					ghostElement.style.setProperty('--y', (offset.top || 0) + 'px')
					addClass(ghostElement, 'ghost')
					addClass(ghostElement, 'dragging')
					removeClass(ghostElement, 'selected')
					const container = getFirst('.icons')
					container?.appendChild(ghostElement)
				} else {
					if (items.length > 1) {
						for (const item of items) {
							removeClass(item, 'selected')
							addClass(item, 'dragging')
						}
					} else {
						removeClass(target, 'selected')
						addClass(target, 'dragging')
					}
				}
			},
			move: e => {
				let target = e.target
				const items = getAll('.selected')

				if (options.useGhost && ghostElement) {
					target = ghostElement

					const x = (parseAxis(target)('x') || 0) + e.dx
					const y = (parseAxis(target)('y') || 0) + e.dy

					move(target)(x, y)
				} else {
					if (items.length > 1) {
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
				}
			},
			end: e => {
				let target = e.target
				const items = getAll('.selected')

				if (options.useGhost && ghostElement) {
					move(target)((parseAxis(ghostElement)('x') - target.offsetLeft) || 0, (parseAxis(ghostElement)('y') - target.offsetTop) || 0)
					ghostElement.remove()
				} else {
					if (items.length > 0) {
						for (const item of items) {
							removeClass(item, 'dragging')
						}
					} else {
						removeClass(target, 'dragging')
					}
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