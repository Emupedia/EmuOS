// noinspection DuplicatedCode

import interact from 'interactjs'
import { addClassName } from '$lib/dom'

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
				if (!options.showContentsWhileDragging) {
					ghostElement = e.target.cloneNode(true)
					addClassName(ghostElement, 'ghost')
					const container = document.querySelector('.desktop')
					container?.appendChild(ghostElement)
				}
			},
			move: e => {
				let target = e.target

				if (!options.showContentsWhileDragging && ghostElement) {
					target = ghostElement
				}

				const x = (parseAxis(target)('x') || 0) + e.dx
				const y = (parseAxis(target)('y') || 0) + e.dy

				move(target)(x, y)
			},
			end: e => {
				if (!options.showContentsWhileDragging && ghostElement) {
					move(e.target)(parseAxis(ghostElement)('x') || 0, parseAxis(ghostElement)('y') || 0)
					ghostElement.remove()
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