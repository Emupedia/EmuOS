<script>
	import TitleBar from '$lib/components/Window/TitleBar.svelte'

	export let x = 0
	export let y = 0
	export let width = 166
	export let height = 30
	export let title = 'Untitled Window'
	export let content = 'No Content'
	export let transform = false

	let dragging = false

	function onMouseDown() {
		dragging = true
	}

	function onMouseMove(e) {
		if (dragging) {
			x = parseInt(x)
			y = parseInt(y)

			x += e.movementX
			y += e.movementY
		}
	}

	function onMouseUp() {
		dragging = false
	}
</script>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<div class="window {$$props.class || ''}" class:dragging class:transform style="--x: {x}px; --y: {y}px; --width: {width}px; --height: {height}px;" {...$$restProps}>
	<TitleBar onMouseDown={onMouseDown}>{#if title}{title}{/if}</TitleBar>
	<slot>{#if content}{content}{/if}</slot>
</div>

<style lang="scss">
	.window {
		position: absolute;

		left: (var(--x));
		top: (var(--y));
		width: var(--width);
		height: var(--height);

		border: 1px solid red;

		overflow: hidden;

		&.transform {
			left: unset;
			top: unset;
			transform: translateX(var(--x)) translateY(var(--y));
		}

		&.dragging {
			cursor: move;

			border: solid 1px gray;

			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
		}
	}
</style>