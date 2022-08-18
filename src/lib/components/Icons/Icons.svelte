<script>
	import { onMount } from 'svelte'
	import { interactable } from '$lib/interactable'
	import { hasClass, addClass, removeClass, isInBounds } from '$lib/dom'

	onMount(() => {
		const elements = [...document.querySelectorAll('.icon')]

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
		if (hasClass(e.target, 'icons')) {
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
		const boxes = [...icons.querySelectorAll('.icon')]

		if (rect) {
			const inBounds = []

			for (const box of boxes) {
				if (isInBounds(rect, box)) {
					inBounds.push(box)
				} else {
					removeClass(box, 'selected')
				}
			}

			if (inBounds.length > 0) {
				for (const box of inBounds) {
					addClass(box, 'selected')
				}
			}

			icons.removeChild(icons.querySelector('.selection'))
		}
	}

	function setMousePosition(e) {
		// noinspection JSDeprecatedSymbols
		e = e || window.event

		if (e.pageX) {
			mouse.x = e.pageX + window.pageXOffset + icons.scrollLeft
			mouse.y = e.pageY + window.pageYOffset + icons.scrollTop
		} else if (e.clientX) {
			mouse.x = e.clientX + document.body.scrollLeft + icons.scrollLeft
			mouse.y = e.clientY + document.body.scrollTop + icons.scrollTop
		}

		const rect = icons.querySelector('.selection')
		const boxes = [...icons.querySelectorAll('.icon')]

		if (rect) {
			const inBounds = []

			for (const box of boxes) {
				if (isInBounds(rect, box)) {
					inBounds.push(box)
				} else {
					removeClass(box, 'selected')
				}
			}

			if (inBounds.length > 0) {
				for (const box of inBounds) {
					addClass(box, 'selected')
				}
			}
		}
	}
</script>

<svelte:window on:mouseup={mouseUp} on:mousedown={mouseDown} on:mousemove={mouseMove} />

<ul bind:this={icons} class="icons"><slot /></ul>

<style lang="scss">
	//noinspection CssOverwrittenProperties
	.icons {
		position: absolute;

		width: 100%;
		//height: 100%;
		height: calc(100% - 28px);

		display: grid;
		grid-template-columns: repeat(auto-fill, 70px);
		grid-template-rows: repeat(auto-fill, 70px);
		grid-auto-flow: column;
		place-content: flex-start;
		gap: 14px 1px;

		contain: strict;

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
</style>