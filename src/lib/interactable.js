// noinspection DuplicatedCode

import interact from 'interactjs'

export const interactable = el => {
	// noinspection JSCheckFunctionSignatures
	interact(el).draggable({
		listeners: {
			move: e => {
				const items = document.getElementsByClassName('selected')
				const { target, dx, dy } = e

				const parseDataAxis = target => axis => parseFloat(target.getAttribute(`data-${axis}`))

				const translate = target => (x, y) => {
					target.style.webkitTransform = 'translate(' + x + 'px, ' + y + 'px)'
					target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
				}

				const updateAttributes = target => (x, y) => {
					target.setAttribute('data-x', x)
					target.setAttribute('data-y', y)
				}

				if (items.length > 0) {
					for (const item of items) {
						const x = parseDataAxis(item)('x') + dx
						const y = parseDataAxis(item)('y') + dy

						translate(item)(x, y)
						updateAttributes(item)(x, y)
					}
				} else {
					const x = (parseDataAxis(target)('x') || 0) + dx
					const y = (parseDataAxis(target)('y') || 0) + dy

					translate(target)(x, y)
					updateAttributes(target)(x, y)
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