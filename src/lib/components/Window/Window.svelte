<script>
	import { onMount } from 'svelte'

	import TitleBar from '$lib/components/Window/TitleBar.svelte'
	import StatusBar from '$lib/components/Window/StatusBar.svelte'
	// import ResizeHandles from '$lib/components/Window/ResizeHandles.svelte'

	import { draggable } from '$lib/draggable'
	import { resizable } from '$lib/resizable'

	const minWidth = 166
	const minHeight = 22

	export let x = 0
	export let y = 0
	export let width = 166
	export let height = 30

	export let title = 'Untitled Window'
	export let showStatus = false
	export let status = 'Idle'
	export let content = 'No Content'
	export let buttons = ['minimize', 'maximize', 'close']

	export let useTransform = false
	export let useTransform3D = true
	export let debug = false

	let window

	onMount(() => {
		draggable(window, { handle: '.title-bar', ignore: 'button, .resize-handles' })
		resizable(window, { handles: { top: '.resize-handles .top', left: '.resize-handles .left', right: '.resize-handles .right', bottom: '.resize-handles .bottom'}, minWidth, minHeight})
	})
</script>

<section bind:this={window} class="window {$$props.class || ''}" class:debug class:transform={useTransform} class:trasform-3d={useTransform3D} style="--x: {x}px; --y: {y}px; --width: {width}px; --height: {height}px; --min-width: {minWidth}px; --min-height: {minHeight}px;" {...$$restProps}>
	<TitleBar class="title-bar {debug ? 'debug' : ''}" {buttons}>{#if title}{title}{/if}</TitleBar>
	<article class="content" class:show-status={showStatus}><slot>{#if content}{content}{/if}</slot></article>
	{#if showStatus}<StatusBar class="status-bar {debug ? 'debug' : ''}">{#if status}{status}{/if}</StatusBar>{/if}
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

		.content {
			background-color: var(--color-white);
			border: 1px solid var(--color-white);
			border-top-color: #7b7b7b;
			border-left-color: #7b7b7b;

			color: #000;

			height: calc(100% - 16px);

			&.show-status {
				height: calc(100% - 36px);
			}

			-webkit-user-select: text;
			-moz-user-select: text;
			-ms-user-select: text;
			user-select: text;

			overflow: auto;
		}

		&.transform {
			left: unset;
			top: unset;
			transform: translate(var(--x), var(--y));
		}

		&.transform-3d {
			left: unset;
			top: unset;
			transform: translate3d(var(--x), var(--y), 0);
		}

		&.dragging {
			cursor: move;

			//border: solid 1px gray;

			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;

			&.debug {
				outline: 1px solid var(--color-debug-muted);
				outline-offset: -1px;
			}
		}

		&.debug {
			outline: 1px solid var(--color-debug);
			outline-offset: -1px;
		}
	}
</style>