// noinspection DuplicatedCode

import interact from 'interactjs'
import { getFirst, addClass } from '$lib/dom'

export const draggable = (el, options) => {
	const parseAxis = target => axis => parseFloat(getComputedStyle(target).getPropertyValue(`--${axis}`))

	const move = target => (x, y) => {
		target.style.setProperty('--x', x + 'px')
		target.style.setProperty('--y', y + 'px')

		return target
	}

	let ghostElement

	// noinspection JSCheckFunctionSignatures
	interact(el).draggable({
		allowFrom: options.handle,
		ignoreFrom: options.ignore,
		listeners: {
			start: e => {
				if (options.useGhostWhileDragging) {
					ghostElement = e.target.cloneNode(true)
					addClass(ghostElement, 'ghost')
					getFirst('.desktop')?.appendChild(ghostElement)
				}
			},
			move: e => {
				let target = e.target

				if (options.useGhostWhileDragging && ghostElement) {
					target = ghostElement
				}

				const x = (parseAxis(target)('x') || 0) + e.dx
				const y = (parseAxis(target)('y') || 0) + e.dy

				move(target)(x, y)
			},
			end: e => {
				if (options.useGhostWhileDragging && ghostElement) {
					move(e.target)(parseAxis(ghostElement)('x') || 0, parseAxis(ghostElement)('y') || 0)
					ghostElement?.remove()
				}
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