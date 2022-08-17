<script>
	import { onMount } from 'svelte'
	import { interactable } from '$lib/interactable'
	import { isInBounds } from '$lib/dom'

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

			setMousePosition(e)

			mouse.startX = mouse.x
			mouse.startY = mouse.y

			element = document.createElement('div')
			element.className = 'selection'
			element.style.left = mouse.x + 'px'
			element.style.top = mouse.y + 'px'

			icons.appendChild(element)
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

	function setMousePosition(e) {
		const ev = e || window.event

		if (ev.pageX) {
			mouse.x = ev.pageX + window.pageXOffset + icons.scrollLeft
			mouse.y = ev.pageY + window.pageYOffset + icons.scrollTop
		} else if (ev.clientX) {
			mouse.x = ev.clientX + document.body.scrollLeft + icons.scrollLeft
			mouse.y = ev.clientY + document.body.scrollTop + icons.scrollTop
		}

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
		}
	}
</script>

<nav>
	<ul bind:this={icons} class="icons" on:mouseup={mouseUp} on:mousedown={mouseDown} on:mousemove={mouseMove}><slot /></ul>
</nav>

<style lang="scss">
	nav {
		height: 100%;

		//noinspection CssOverwrittenProperties
		.icons {
			position: relative;
			display: block;
			height: 100%;
			overflow: hidden;
			overflow-x: hidden;
			overflow-y: auto;
		}

		:global(.selection) {
			position: absolute;

			border-width: 1px;
			border-style: dotted;
			border-color: #ffff7f;

			pointer-events: none;

			z-index: 1;
		}
	}
</style>