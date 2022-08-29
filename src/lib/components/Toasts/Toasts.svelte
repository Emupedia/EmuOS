<svelte:options tag="emuos-toasts" />

<script>
	import { fade, fly } from 'svelte/transition'
	import { flip } from 'svelte/animate'
	import { toast } from '$lib/stores/toast'

	import Toast from '$lib/components/Toasts/Toast.svelte'

	export let options = {}
	export let target = 'default'

	export { toast }

	const useWebComponents = true

	$: toast.init(target, options)

	let items

	$: items = $toast.filter(i => i.target === target)

	const getCss = theme => Object.keys(theme).reduce((a, c) => `${a}${c}:${theme[c]};`, '')
</script>

<ul class="toasts">
	{#each items as item(item.id)}
		<li class={item.classes.join(' ')} in:fly={item.intro} out:fade animate:flip={{ duration: 200 }} style={getCss(item.theme)}>
			{#if useWebComponents}
				<emuos-toast {item}></emuos-toast>
			{:else}
				<Toast {item} />
			{/if}
		</li>
	{/each}
</ul>

<style lang="scss">
	.toasts {
		position: fixed;

		top: var(--toastsTop, 1.5rem);
		right: var(--toastsRight, 2rem);
		bottom: var(--toastsBottom, auto);
		left: var(--toastsLeft, auto);
		margin: 0;
		padding: 0;

		list-style-type: none;

		pointer-events: none;

		z-index: var(--toastsZIndex, auto);
	}
</style>