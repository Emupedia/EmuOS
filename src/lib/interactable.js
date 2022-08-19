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

	let items = []
	let ghostElements = []

	// noinspection JSCheckFunctionSignatures
	interact(el).draggable({
		listeners: {
			start: e => {
				const { target } = e

				items = getAll('.selected')

				if (options.useGhost) {
					for (const item of items) {
						ghostElements.push(item.cloneNode(true))
						let current = [...ghostElements].pop()
						let offset = getOffset(item)
						current.style.setProperty('--x', (offset.left || 0) + 'px')
						current.style.setProperty('--y', (offset.top || 0) + 'px')
						removeClass(current, 'selected')
						addClass(current, 'ghost')
						addClass(current, 'dragging')
						const container = getFirst('.icons')
						container?.appendChild(current)
					}
				} else {
					if (items.length > 1) {
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

				if (options.useGhost && ghostElements.length > 0) {
					for (const item of ghostElements) {
						const x = (parseAxis(item)('x') || 0) + e.dx
						const y = (parseAxis(item)('y') || 0) + e.dy

						move(item)(x, y)
					}
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

				if (options.useGhost && ghostElements.length > 0) {
					for (const [i, item] of items.entries()) {
						move(item)((parseAxis(ghostElements[i])('x') - item.offsetLeft) || 0, (parseAxis(ghostElements[i])('y') - item.offsetTop) || 0)
						ghostElements[i].remove()
					}
				} else {
					if (items.length > 1) {
						for (const item of items) {
							removeClass(item, 'dragging')
						}
					} else {
						removeClass(target, 'dragging')
					}
				}

				items = []
				ghostElements = []
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