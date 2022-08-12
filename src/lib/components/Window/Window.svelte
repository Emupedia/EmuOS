<script>
	import { onMount } from 'svelte'

	import TitleBar from '$lib/components/Window/TitleBar.svelte'
	import StatusBar from '$lib/components/Window/StatusBar.svelte'
	import Panel from '$lib/components/Panel/Panel.svelte'
	// import ResizeHandles from '$lib/components/Window/ResizeHandles.svelte'

	import { draggable } from '$lib/draggable'
	import { resizable } from '$lib/resizable'

	const minWidth = 150
	const minHeight = 22

	export let x = 0
	export let y = 0
	export let width = minWidth
	export let height = minHeight

	export let title = 'Untitled Window'
	export let status = 'No Status'
	export let content = 'No Content'
	export let buttons = ['minimize', 'maximize', 'close']

	export let showTitleBar = true
	export let showStatusBar = true
	export let useTransform = false
	export let useTransform3D = true
	export let debug = false

	let window
	let statusContent = status

	onMount(() => {
		draggable(window, { handle: '.title-bar', ignore: '.title-bar button, .resize-handles' })
		resizable(window, { handles: { top: '.resize-handles .top', left: '.resize-handles .left', right: '.resize-handles .right', bottom: '.resize-handles .bottom'}, margin: 3, minWidth, minHeight})
	})
</script>

<section bind:this={window} class="window {$$props.class || ''}" class:debug class:transform={useTransform} class:transform-3d={useTransform3D} style="--x: {x}px; --y: {y}px; --width: {width}px; --height: {height}px; --min-width: {minWidth}px; --min-height: {minHeight}px;" {...$$restProps}>
	{#if showTitleBar}<TitleBar class="title-bar {debug ? 'debug' : ''}" {buttons}>{title}</TitleBar>{/if}
	<Panel class="panel {showTitleBar ? 'has-title-bar' : ''} {showStatusBar ? 'has-status-bar' : ''} {debug ? 'debug' : ''}"><slot>{content}</slot></Panel>
	{#if showStatusBar}<StatusBar class="status-bar {debug ? 'debug' : ''}">{statusContent}</StatusBar>{/if}
	<!--<ResizeHandles class="resize-handles {debug ? 'debug' : ''}" />-->
</section>

<style lang="scss">
	.window {
		position: absolute;

		left: (var(--x));
		top: (var(--y));
		width: var(--width);
		height: var(--height);
		min-width: var(--min-width);
		min-height: var(--min-height);

		padding: 3px;

		background-color: var(--color-background-window-panel);

		-moz-box-shadow: inset -1px -1px 0 #000, inset 1px 1px 0 #dfdfdf, inset -2px -2px 0 #808080, inset 2px 2px 0 #fff;
		-webkit-box-shadow: inset -1px -1px 0 #000, inset 1px 1px 0 #dfdfdf, inset -2px -2px 0 #808080, inset 2px 2px 0 #fff;
		box-shadow: inset -1px -1px 0 #000, inset 1px 1px 0 #dfdfdf, inset -2px -2px 0 #808080, inset 2px 2px 0 #fff;

		overflow: hidden;

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