<script>
	import { onMount } from 'svelte'
	import { getAll } from '$lib/dom'
	import { draggable } from '$lib/draggable'
	import { resizable } from '$lib/resizable'

	const useGhostWhileDragging = true
	const useGhostWhileResizing = true
	const minWidth = 112
	const minHeight = 27

	onMount(() => {
		const elements = [...getAll('.window')]

		if (elements) {
			for (const el of elements) {
				draggable(el, { handle: '.title-bar', ignore: '.title-bar button, .resize-handles', useGhostWhileDragging })
				resizable(el, { handles: { top: '.resize-handles .top', left: '.resize-handles .left', right: '.resize-handles .right', bottom: '.resize-handles .bottom'}, margin: 5, minWidth, minHeight, useGhostWhileResizing})
			}
		}
	})
</script>

<nav class="windows {$$props.class || ''}" {...$$restProps}><slot /></nav>

<style lang="scss">
	nav {
		position: absolute;
		left: 0;
		top: 0;

		width: 100%;
		//height: 100%;
		height: calc(100% - 28px);

		//contain: strict;

		pointer-events: none;

		z-index: 2;
	}
</style>