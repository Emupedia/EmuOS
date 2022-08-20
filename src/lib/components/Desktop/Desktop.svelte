<script>
	import { hasClass, addClass, removeClass, isInBounds } from '$lib/dom'

	export let debug = false

	const mouse = {
		x: 0,
		y: 0,
		startX: 0,
		startY: 0
	}

	let desktop
	let element

	function mouseDown(e) {
		if (hasClass(e.target, 'icons')) {
			const rects = [...desktop.querySelectorAll('.selection')]

			if (rects) {
				for (const rect of rects) {
					desktop.removeChild(rect)
				}
			}

			setMousePosition(e)

			mouse.startX = mouse.x
			mouse.startY = mouse.y

			element = document.createElement('div')
			element.className = 'selection'
			element.style.left = mouse.x + 'px'
			element.style.top = mouse.y + 'px'

			desktop.appendChild(element)
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

		const rect = desktop.querySelector('.selection')
		const boxes = [...desktop.querySelectorAll('.icon:not(.ghost)')]

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

			desktop.removeChild(desktop.querySelector('.selection'))
		}
	}

	function setMousePosition(e) {
		// noinspection JSDeprecatedSymbols
		e = e || window.event

		if (e.pageX) {
			mouse.x = e.pageX + window.pageXOffset + desktop.scrollLeft
			mouse.y = e.pageY + window.pageYOffset + desktop.scrollTop
		} else if (e.clientX) {
			mouse.x = e.clientX + document.body.scrollLeft + desktop.scrollLeft
			mouse.y = e.clientY + document.body.scrollTop + desktop.scrollTop
		}

		const rect = desktop.querySelector('.selection')
		const boxes = [...desktop.querySelectorAll('.icon:not(.ghost)')]

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

<main bind:this={desktop} class="desktop {$$props.class || ''}" class:debug {...$$restProps}><slot /></main>

<style lang="scss">
	.desktop {
		height: calc(100% - 28px);

		background-color: var(--color-background-desktop);

		&.debug {
			outline: 1px solid var(--color-debug);
			outline-offset: -1px;
		}

		:global(.selection) {
			position: absolute;

			pointer-events: none;

			z-index: 1;

			outline: 1px dotted #ffff7f;
			outline-offset: -1px;

			@supports (mix-blend-mode: difference) {
				mix-blend-mode: difference;
				outline-color: #fff;
			}
		}
	}
</style>