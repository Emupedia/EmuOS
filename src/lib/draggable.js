// noinspection DuplicatedCode,JSUnusedGlobalSymbols

import interact from 'interactjs'
import { getFirst, addClass, getProperty, setProperty } from '$lib/dom'

export const draggable = (el, options) => {
	const move = target => (x, y) => {
		setProperty(target, 'x', x)
		setProperty(target, 'y', y)

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

				const x = (getProperty(target, 'x') || 0) + e.dx
				const y = (getProperty(target, 'y') || 0) + e.dy

				move(target)(x, y)
			},
			end: e => {
				if (options.useGhostWhileDragging && ghostElement) {
					move(e.target)(getProperty(ghostElement, 'x') || 0, getProperty(ghostElement, 'y') || 0)
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