<script>
	import { fade } from 'svelte/transition'
	import { addUnits } from '$lib/dom'

	export let x = 0
	export let y = 0
	export let minWidth = 118
	export let minHeight = 22
	export let width = minWidth
	export let height = 'auto'

	export let content = 'No Content'
	export let useTransform = false
	export let useTransform3D = true
	export let debug = false

	x = addUnits(x)
	y = addUnits(y)
	width = addUnits(width)
	height = addUnits(height)
	minWidth = addUnits(minWidth)
	minHeight = addUnits(minHeight)

	let menu
	let show = false

	$: if (menu) {
		const rect = menu.getBoundingClientRect()

		if (x > window.innerWidth - rect.width) {
			x -= rect.width
		}

		x = addUnits(x)
		y = addUnits(Math.min(window.innerHeight - rect.height, y))
	}

	function onContextMenu(e) {
		x = e.clientX
		y = e.clientY

		show = true
	}

	function onMouseDown(e) {
		if (e.target === menu || menu.contains(e.target)) return

		show = false
	}
</script>

<svelte:window on:contextmenu|preventDefault={onContextMenu} on:mousedown={onMouseDown} />

<nav bind:this={menu} transition:fade={{ duration: 100 }} class="menu {$$props.class || ''}" class:show class:transform={useTransform} class:transform-3d={useTransform3D} class:debug style="--x: {x}; --y: {y}; --width: {width}; --height: {height}; --min-width: {minWidth}; --min-height: {minHeight};" {...$$restProps}>
	<menu><slot>{content}</slot></menu>
</nav>

<style lang="scss">
	.menu {
		visibility: hidden;
		position: absolute;

		left: (var(--x));
		top: (var(--y));
		width: var(--width);
		height: var(--height);
		min-width: var(--min-width);
		min-height: var(--min-height);

		background-color: var(--color-background-window-panel);

		-moz-box-shadow: inset -1px -1px 0 #000, inset 1px 1px 0 #c0c0c0, inset -2px -2px 0 #808080, inset 2px 2px 0 #fff;
		-webkit-box-shadow: inset -1px -1px 0 #000, inset 1px 1px 0 #c0c0c0, inset -2px -2px 0 #808080, inset 2px 2px 0 #fff;
		box-shadow: inset -1px -1px 0 #000, inset 1px 1px 0 #c0c0c0, inset -2px -2px 0 #808080, inset 2px 2px 0 #fff;

		padding: 3px;
		//text-align: center;

		overflow: hidden;

		z-index: 2;

		menu, ul, ol {
			list-style-type: none;
		}

		&.show {
			visibility: visible;
		}

		&.transform {
			left: 0;
			top: 0;
			-webkit-transform: translate(var(--x), var(--y));
			transform: translate(var(--x), var(--y));
		}

		&.transform-3d {
			left: 0;
			top: 0;
			-webkit-transform: translate3d(var(--x), var(--y), 0);
			transform: translate3d(var(--x), var(--y), 0);
		}

		&.debug {
			outline: 1px solid var(--color-debug);
			outline-offset: -1px;
		}
	}
</style>