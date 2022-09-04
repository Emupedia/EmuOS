<!--suppress JSUnresolvedVariable -->

<svelte:options tag="emuos-toast" />

<script>
	import { onMount, onDestroy } from 'svelte'
	import { tweened } from 'svelte/motion'
	import { linear } from 'svelte/easing'
	import { toast, toastDefaults } from '$lib/stores/toast'

	export let item = toastDefaults

	const click = () => {
		// noinspection JSUnresolvedVariable
		if (typeof item.onclick === 'function') {
			// noinspection JSUnresolvedFunction,JSUnresolvedVariable
			item.onclick(item.id)
		} else if (item.dismissable) {
			close()
		}
	}

	const close = () => toast.close(item.id)

	const autoclose = () => {
		if ($progress === 1 || $progress === 0) {
			close()
		}
	}

	let progress = tweened(item.initial, { duration: item.duration, easing: linear })
	let next = item.initial
	let prev = next
	let paused = false
	let mounted = false

	$: if (next !== item.next && mounted) {
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
		// noinspection JSUnresolvedVariable
		const { props = {}, sendIdTo } = item.component

		if (sendIdTo) {
			// noinspection JSUnresolvedVariable
			props[sendIdTo] = item.id
		}

		return props
	}

	onMount(() => {
		console.log('Toast.onMount')

		progress = tweened(item.initial, { duration: item.duration, easing: linear })
		next = item.initial
		prev = next
		mounted = true
	})

	onDestroy(() => {
		console.log('Toast.onDestroy')

		// noinspection JSUnresolvedVariable
		if (typeof item.onclose === 'function') {
			// noinspection JSUnresolvedFunction,JSUnresolvedVariable
			item.onclose(item.id)
		}
	})
</script>

<div class="toast" class:pe={item.pausable || item.dismissable || typeof item.onclick === 'function'} on:mouseenter={pause} on:mouseleave={resume}>
	<div role="status" class="toast-message" class:pe={item.component || typeof item.onclick === 'function'} on:click={click}>
		{#if item.component}
			<svelte:component this={item.component.src} {...getProps()} />
		{:else}
			{@html item.msg}
		{/if}
	</div>

	{#if item.dismissable}
		<button class="toast-button pe" type="button" tabindex="-1" on:click={close}>{@html item.close}</button>
	{/if}

	<progress class="toast-progress" value={$progress}></progress>
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
		gap: var(--toastGap, 0);
		flex-direction: row;
		align-items: center;
		overflow: hidden;
		//will-change: transform, opacity;

		&.pe {
			pointer-events: auto;
		}
	}

	.toast-message {
		padding: var(--toastMessagePadding, 0.75rem 0.5rem);
		flex: 1 1 0;
		cursor: pointer;

		& > a {
			pointer-events: auto;
		}
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
		margin: var(--toastButtonMargin, 0);
		padding: var(--toastButtonPadding, 0);

		&:active {
			background: var(--toastButtonBackgroundActive, rgba(66, 66, 66, 0.9));
			color: var(--toastButtonColorActive, #fff);
			box-shadow: var(--toastButtonBoxShadowActive, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06));
			border: var(--toastButtonBorderActive, none);
			border-radius: var(--toastButtonBorderRadiusActive, 0);
			margin: var(--toastButtonMarginActive, 0);
			padding: var(--toastButtonPaddingActive, 0);
		}

		&.pe {
			pointer-events: auto;
		}
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

		&::-webkit-progress-bar {
			background: transparent;
		}

		&::-webkit-progress-value {
			background:  var(--toastProgressBackground, rgba(33, 150, 243, 0.75));
		}

		&::-moz-progress-bar {
			background:  var(--toastProgressBackground, rgba(33, 150, 243, 0.75));
		}
	}
</style>