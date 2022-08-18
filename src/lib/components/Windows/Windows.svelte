<script>
	import { onMount } from 'svelte'
	import { draggable } from '$lib/draggable'
	import { resizable } from '$lib/resizable'

	const showContentsWhileDragging = true
	const showContentsWhileResizing = true
	const minWidth = 112
	const minHeight = 27

	onMount(() => {
		const elements = [...document.querySelectorAll('.window')]

		if (elements) {
			for (const el of elements) {
				draggable(el, { handle: '.title-bar', ignore: '.title-bar button, .resize-handles', showContentsWhileDragging })
				resizable(el, { handles: { top: '.resize-handles .top', left: '.resize-handles .left', right: '.resize-handles .right', bottom: '.resize-handles .bottom'}, margin: 5, minWidth, minHeight, showContentsWhileResizing})
			}
		}
	})
</script>

<nav class="windows"><slot /></nav>

<style lang="scss">
	nav {
		position: absolute;
		left: 0;
		top: 0;

		width: 100%;
		//height: 100%;
		height: calc(100% - 28px);

		pointer-events: none;
	}
</style>