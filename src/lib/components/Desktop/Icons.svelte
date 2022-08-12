<script>
	import { onMount } from 'svelte'
	import { interactable } from '$lib/interactable'

	onMount(() => {
		const elements = [...document.querySelectorAll('.desktop-icon')]

		if (elements) {
			for (const el of elements) {
				interactable(el)
			}
		}
	})

	let icons
	let element

	const mouse = {
		x: 0,
		y: 0,
		startX: 0,
		startY: 0
	}

	function mouseDown(e) {
		if (e.target.classList.contains('icons')) {
			const rects = [...icons.querySelectorAll('.selection')]

			if (rects) {
				for (const rect of rects) {
					icons.removeChild(rect)
				}
			}

			mouse.startX = mouse.x
			mouse.startY = mouse.y

			element = document.createElement('div')
			element.className = 'selection'
			element.style.left = mouse.x + 'px'
			element.style.top = mouse.y + 'px'

			icons.appendChild(element)
		}
	}

	function setMousePosition(e) {
		const ev = e || window.event

		if (ev.pageX) {
			mouse.x = ev.pageX + window.pageXOffset
			mouse.y = ev.pageY + window.pageYOffset
		} else if (ev.clientX) {
			mouse.x = ev.clientX + document.body.scrollLeft
			mouse.y = ev.clientY + document.body.scrollTop
		}
	}

	function mouseMove(e) {
		setMousePosition(e)

		if (element) {
			element.style.width = Math.abs(mouse.x - mouse.startX) + 'px'
			element.style.height = Math.abs(mouse.y - mouse.startY) + 'px'
			element.style.left = mouse.x - mouse.startX < 0 ? mouse.x + 'px' : mouse.startX + 'px'
			element.style.top = mouse.y - mouse.startY < 0 ? mouse.y + 'px' : mouse.startY + 'px'
		}
	}

	function mouseUp() {
		element = null

		const rect = icons.querySelector('.selection')
		const boxes = [...icons.querySelectorAll('.desktop-icon')]

		if (rect) {
			const inBounds = []

			for (const box of boxes) {
				if (isInBounds(rect, box)) {
					inBounds.push(box)
				} else {
					box.classList.remove('selected')
				}
			}

			if (inBounds.length > 0) {
				for (const box of inBounds) {
					box.classList.add('selected')
				}
			}

			icons.removeChild(icons.querySelector('.selection'))
		}
	}

	function isInBounds(obj1, obj2) {
		const a = obj1.getBoundingClientRect()
		const b = obj2.getBoundingClientRect()

		return (a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y)
	}
</script>

<nav bind:this={icons} class="icons" on:mouseup={mouseUp} on:mousedown={mouseDown} on:mousemove={mouseMove}><slot /></nav>

<style lang="scss">
	.icons {
		height: 100vh;
	}
</style>