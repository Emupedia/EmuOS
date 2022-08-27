// noinspection DuplicatedCode,JSUnusedGlobalSymbols,JSUnresolvedFunction,JSUnresolvedVariable,JSCheckFunctionSignatures

import interact from 'interactjs'
import { getFirst, getAll, getOffset, getProperty, setProperty, addClass, removeClass } from '$lib/dom'

export const interactable = (el, options) => {
	const move = target => (x, y) => {
		setProperty(target, 'x', x)
		setProperty(target, 'y', y)

		return target
	}

	let items = []
	let ghostElements = []

	// noinspection JSCheckFunctionSignatures
	interact(el).draggable({
		listeners: {
			start: e => {
				const container = getFirst('.icons')
				items = getAll('.selected')

				for (const item of items) {
					if (options.useGhost) {
						ghostElements.push(item.cloneNode(true))
						let current = ghostElements[ghostElements.length - 1]
						let offset = getOffset(item)
						setProperty(current, 'x', offset.left || 0)
						setProperty(current, 'y', offset.top || 0)
						removeClass(current, 'selected')
						addClass(current, 'ghost')
						addClass(current, 'dragging')
						container?.appendChild(current)
					} else {
						addClass(item, 'dragging')
						removeClass(item, 'selected')
					}
				}

				if (typeof options.onStart === 'function') {
					options.onStart(e)
				}
			},
			move: e => {
				let elements = options.useGhost && ghostElements.length > 0 ? ghostElements : items

				for (const el of elements) {
					const x = (getProperty(el, 'x') || 0) + e.dx
					const y = (getProperty(el, 'y') || 0) + e.dy

					move(el)(x, y)
				}

				if (typeof options.onMove === 'function') {
					options.onMove(e)
				}
			},
			end: e => {
				if (options.useGhost && ghostElements.length > 0) {
					for (const [i, item] of items.entries()) {
						move(item)((getProperty(ghostElements[i], 'x') - item.offsetLeft) || 0, (getProperty(ghostElements[i], 'y') - item.offsetTop) || 0)
						ghostElements[i]?.remove()
					}
				} else {
					for (const item of items) {
						removeClass(item, 'dragging')
						addClass(item, 'selected')
					}
				}

				if (typeof options.onEnd === 'function') {
					options.onEnd(e, items)
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