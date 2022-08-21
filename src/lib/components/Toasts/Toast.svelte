<script>
	import { onDestroy } from 'svelte'
	import { tweened } from 'svelte/motion'
	import { linear } from 'svelte/easing'
	import { toast } from '$lib/stores'

	export let item

	// noinspection JSUnusedAssignment
	const progress = tweened(item.initial, { duration: item.duration, easing: linear })

	const close = () => toast.pop(item.id)

	const autoclose = () => {
		if ($progress === 1 || $progress === 0) {
			close()
		}
	}

	// noinspection JSUnusedAssignment
	let next = item.initial
	let prev = next
	let paused = false

	$: if (next !== item.next) {
		next = item.next
		prev = $progress
		paused = false
		progress.set(next).then(autoclose)
	}

	const pause = () => {
		if (item.pausable && !paused && $progress !== next) {
			progress.set($progress, { duration: 0 })
			paused = true
		}
	}

	const resume = () => {
		if (paused) {
			const d = item.duration
			const duration = d - d * (($progress - prev) / (next - prev))
			progress.set(next, { duration }).then(autoclose)
			paused = false
		}
	}

	const getProps = () => {
		const { props = {}, sendIdTo } = item.component

		if (sendIdTo) {
			props[sendIdTo] = item.id
		}

		return props
	}

	// `progress` has been renamed to `next`; shim included for backward compatibility, to remove in next major
	$: if (typeof item.progress !== 'undefined') {
		item.next = item.progress
	}

	onDestroy(() => {
		// noinspection JSUnresolvedVariable
		if (typeof item.onpop === 'function') {
			// noinspection JSUnresolvedFunction
			item.onpop(item.id)
		}
	})
</script>

<div class="toast" class:pe={item.pausable} on:mouseenter={pause} on:mouseleave={resume}>
	<div role="status" class="toast-message" class:pe={item.component}>
		{#if item.component}
			<svelte:component this={item.component.src} {...getProps()} />
		{:else}
			{@html item.msg}
		{/if}
	</div>

	{#if item.dismissable}
		<button class="toast-button pe" role="button" type="button" tabindex="-1" on:click={close}>{@html item.close}</button>
	{/if}

	<!--suppress CheckEmptyScriptTag -->
	<progress class="toast-progress" value={$progress} />
</div>

<style lang="scss">
	.toast {
		width: var(--toastWidth, 16rem);
		height: var(--toastHeight, auto);
		min-height: var(--toastMinHeight, 3.5rem);
		margin: var(--toastMargin, 0 0 0.5rem 0);
		padding: var(--toastPadding, 0);
		background: var(--toastBackground, rgba(66, 66, 66, 0.9));
		color: var(--toastColor, #fff);
		box-shadow: var(--toastBoxShadow, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06));
		border: var(--toastBorder, none);
		border-radius: var(--toastBorderRadius, 0.125rem);
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		overflow: hidden;
		will-change: transform, opacity;
		-webkit-tap-highlight-color: transparent;
	}

	.toast-message {
		padding: var(--toastMessagePadding, 0.75rem 0.5rem);
		flex: 1 1 0;
	}

	.pe, .toast-message :global(a) {
		pointer-events: auto;
	}

	.toast-button {
		width: var(--toastButtonWidth, 2rem);
		height: var(--toastButtonHeight, 100%);
		font: 1rem sans-serif;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		outline: none;
		background: var(--toastButtonBackground, rgba(66, 66, 66, 0.9));
		color: var(--toastButtonColor, #fff);
		box-shadow: var(--toastButtonBoxShadow, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06));
		border: var(--toastButtonBorder, none);
		border-radius: var(--toastButtonBorderRadius, 0);
	}

	.toast-progress {
		top: var(--toastProgressTop, auto);
		right: var(--toastProgressRight, auto);
		bottom: var(--toastProgressBottom, 0);
		left: var(--toastProgressLeft, 0);
		height: var(--toastProgressHeight, 6px);
		width: var(--toastProgressWidth, 100%);
		position: absolute;
		display: block;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		border: none;
		background: transparent;
		pointer-events: none;
	}

	.toast-progress::-webkit-progress-bar {
		background: transparent;
	}

	.toast-progress::-webkit-progress-value {
		background:  var(--toastProgressBackground, rgba(33, 150, 243, 0.75));
	}

	.toast-progress::-moz-progress-bar {
		background:  var(--toastProgressBackground, rgba(33, 150, 243, 0.75));
	}
</style>