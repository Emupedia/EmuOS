<svelte:options tag="emuos-window" />

<script>
	import { onMount } from 'svelte'
	import { variables } from '$lib/variables'
	import { addUnits } from '$lib/dom'

	import Panel from '$lib/components/Panel/Panel.svelte'
	// import ResizeHandles from '$lib/components/Windows/ResizeHandles.svelte'
	import TitleBar from '$lib/components/Windows/TitleBar.svelte'
	import StatusBar from '$lib/components/Windows/StatusBar.svelte'

	export let x = 0
	export let y = 0
	export let minWidth = 112
	export let minHeight = 27
	export let width = minWidth
	export let height = minHeight
	export let padding = 1

	export let title = 'Untitled Window'
	export let status = 'No Status'
	export let content = 'No Content'
	export let buttons = ['minimize', 'maximize', 'close']

	export let showTitleBar = true
	export let showStatusBar = false
	export let isContentEditable = false
	export let useTransform = false
	export let useTransform3D = true
	export let debug = false

	let statusContent
	let mounted = false

	$: if (mounted) {
		x = addUnits(x)
		y = addUnits(y)
		width = addUnits(width)
		height = addUnits(height)
		minWidth = addUnits(minWidth)
		minHeight = addUnits(minHeight)
		padding = addUnits(padding)
		statusContent = status
	}

	onMount(() => {
		console.log('Window.onMount')

		console.log('title')
		console.log(title)
		console.log('status')
		console.log(status)
		console.log('content')
		console.log(content)
		console.log('buttons')
		console.log(buttons)
		console.log('showTitleBar')
		console.log(showTitleBar)
		console.log('showStatusBar')
		console.log(showStatusBar)
		console.log('isContentEditable')
		console.log(isContentEditable)
		console.log('useTransform')
		console.log(useTransform)
		console.log('useTransform3D')
		console.log(useTransform3D)
		console.log('debug')
		console.log(debug)

		mounted = true
	})
</script>

<section class="window {$$props.class || ''}" class:debug class:move={!useTransform && !useTransform3D} class:transform={useTransform} class:transform-3d={useTransform3D} style="--x: {x}; --y: {y}; --width: {width}; --height: {height}; --min-width: {minWidth}; --min-height: {minHeight};"  {...$$restProps}>
	{#if variables?.USE_WEBCOMPONENTS}
		{#if showTitleBar}<emuos-titlebar class="title-bar {debug ? 'debug' : ''}" {buttons}>{title}</emuos-titlebar>{/if}
		<emuos-panel class="panel {showTitleBar ? 'has-title-bar' : ''} {showStatusBar ? 'has-status-bar' : ''} {debug ? 'debug' : ''}" {isContentEditable} {padding}><slot>{content}</slot></emuos-panel>
		{#if showStatusBar}<emuos-statusbar class="status-bar {debug ? 'debug' : ''}">{statusContent}</emuos-statusbar>{/if}
		<!--<emuos-resize-handles class="resize-handles {debug ? 'debug' : ''}"></emuos-resize-handles>-->
	{:else}
		{#if showTitleBar}<TitleBar class="title-bar {debug ? 'debug' : ''}" {buttons}>{title}</TitleBar>{/if}
		<Panel class="panel {showTitleBar ? 'has-title-bar' : ''} {showStatusBar ? 'has-status-bar' : ''} {debug ? 'debug' : ''}" {isContentEditable} {padding}><slot>{content}</slot></Panel>
		{#if showStatusBar}<StatusBar class="status-bar {debug ? 'debug' : ''}">{statusContent}</StatusBar>{/if}
		<!--<ResizeHandles class="resize-handles {debug ? 'debug' : ''}" />-->
	{/if}
</section>

<style lang="scss">
	.window {
		position: absolute;
		left: 0;
		top: 0;

		width: var(--width);
		height: var(--height);
		min-width: var(--min-width);
		min-height: var(--min-height);

		padding: 4px;

		background-color: var(--color-background-window-panel);

		-moz-box-shadow: inset -1px -1px 0 #000, inset 1px 1px 0 #dfdfdf, inset -2px -2px 0 #808080, inset 2px 2px 0 #fff;
		-webkit-box-shadow: inset -1px -1px 0 #000, inset 1px 1px 0 #dfdfdf, inset -2px -2px 0 #808080, inset 2px 2px 0 #fff;
		box-shadow: inset -1px -1px 0 #000, inset 1px 1px 0 #dfdfdf, inset -2px -2px 0 #808080, inset 2px 2px 0 #fff;

		overflow: hidden;

		pointer-events: auto;

		//noinspection CssOverwrittenProperties
		&:global(.ghost) {
			background-color: transparent;
			//background-image: url(/assets/images/border-ghost.svg);
			//background-repeat: repeat;
			//background-size: 90px 90px;
			box-shadow: none;

			border-width: 4px;
			border-style: solid;

			border-image-source: url(/assets/images/border-ghost.svg);
			border-image-width: 3px;
			border-image-slice: 3%;
			border-image-outset: 0;
			border-image-repeat: repeat;
			//-webkit-mask: url(/assets/images/border-ghost-mask.svg) 0/100% 100%, linear-gradient(#fff, #fff);
			//-webkit-mask-composite: xor;
			//mask: url(/assets/images/border-ghost-mask.svg) 0/100% 100%, linear-gradient(#fff, #fff);
			//mask-composite: exclude;

			image-rendering: pixelated;

			pointer-events: none;

			z-index: 2;

			@supports (mix-blend-mode: difference) {
				mix-blend-mode: difference;
			}
		}

		&:global(.ghost > *) {
			visibility: hidden;
		}

		&.move {
			left: (var(--x));
			top: (var(--y));
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