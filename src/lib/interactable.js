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
			start: () => {
				const container = getFirst('.icons')
				items = getAll('.selected')

				for (const item of items) {
					if (options.useGhost) {
						ghostElements.push(item.cloneNode(true))
						let current = ghostElements[ghostElements.length - 1]
						let offset = getOffset(item)
						current.style.setProperty('--x', (offset.left || 0) + 'px')
						current.style.setProperty('--y', (offset.top || 0) + 'px')
						removeClass(current, 'selected')
						addClass(current, 'ghost')
						addClass(current, 'dragging')
						container?.appendChild(current)
					} else {
						addClass(item, 'dragging')
						removeClass(item, 'selected')
					}
				}
			},
			move: e => {
				let elements = options.useGhost && ghostElements.length > 0 ? ghostElements : items

				for (const el of elements) {
					const x = (parseAxis(el)('x') || 0) + e.dx
					const y = (parseAxis(el)('y') || 0) + e.dy

					move(el)(x, y)
				}
			},
			end: () => {
				if (options.useGhost && ghostElements.length > 0) {
					for (const [i, item] of items.entries()) {
						move(item)((parseAxis(ghostElements[i])('x') - item.offsetLeft) || 0, (parseAxis(ghostElements[i])('y') - item.offsetTop) || 0)
						ghostElements[i]?.remove()
					}
				} else {
					for (const item of items) {
						removeClass(item, 'dragging')
						addClass(item, 'selected')
					}
				}

				items = []
				ghostElements = []
			}
		},
		modifiers: [
			interact.modifiers.restrictRect({ restriction: 'parent', endOnly: false })
		],
		autoScroll: false,
		inertia: false
	})

	return el
}