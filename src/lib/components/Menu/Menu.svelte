<script>
	import { createEventDispatcher } from 'svelte'
	import { fade } from 'svelte/transition'

	export let x = 0
	export let y = 0
	export let content = 'No Content'
	export let useTransform = false
	export let useTransform3D = true
	export let debug = false

	let menu
	let show = false

	const dispatch = createEventDispatcher()

	$: (() => {
		if (!menu) return

		const rect = menu.getBoundingClientRect()

		x = Math.min(window.innerWidth - rect.width, x)

		if (y > window.innerHeight - rect.height) {
			y -= rect.height
		}
	})(x, y)

	function onMenu(e) {
		e.preventDefault()

		x = e.clientX
		y = e.clientY

		show = true
		return false
	}

	function onPageClick(e) {
		if (e.target === menu || menu.contains(e.target)) return

		show = false
		dispatch('clickoutside')
	}
</script>

<svelte:window on:contextmenu={onMenu} on:click={onPageClick} />

<nav bind:this={menu} transition:fade={{ duration: 100 }} class="menu {$$props.class || ''}" class:show class:transform={useTransform} class:transform-3d={useTransform3D} class:debug style="--x: {x}px; --y: {y}px;" {...$$restProps}>
	<slot>{content}</slot>
</nav>

<style lang="scss">
	.menu {
		display: none;
		position: absolute;

		left: (var(--x));
		top: (var(--y));

		overflow: hidden;

		&.show {
			display: block;
		}

		&.transform {
			left: 0;
			top: 0;
			transform: translate(var(--x), var(--y));
		}

		&.transform-3d {
			left: 0;
			top: 0;
			transform: translate3d(var(--x), var(--y), 0);
		}

		&.debug {
			outline: 1px solid var(--color-debug);
			outline-offset: -1px;
		}
	}
</style>