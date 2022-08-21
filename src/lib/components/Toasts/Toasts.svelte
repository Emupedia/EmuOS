<script>
	import { fade, fly } from 'svelte/transition'
	import { flip } from 'svelte/animate'
	import { toast } from '$lib/stores'

	import Toast from '$lib/components/Toasts/Toast.svelte'

	export let options = {}
	export let target = 'default'

	$: toast._init(target, options)

	let items

	$: items = $toast.filter(i => i.target === target)

	const getCss = theme => Object.keys(theme).reduce((a, c) => `${a}${c}:${theme[c]};`, '')
</script>

<ul class="_toastContainer">
	{#each items as item(item.id)}
		<li class={item.classes.join(' ')} in:fly={item.intro} out:fade animate:flip={{ duration: 200 }} style={getCss(item.theme)}>
			<Toast {item} />
		</li>
	{/each}
</ul>

<style lang="scss">
	._toastContainer {
		position: fixed;

		top: var(--toastContainerTop, 1.5rem);
		right: var(--toastContainerRight, 2rem);
		bottom: var(--toastContainerBottom, auto);
		left: var(--toastContainerLeft, auto);
		margin: 0;
		padding: 0;

		list-style-type: none;

		pointer-events: none;

		z-index: var(--toastContainerZIndex, auto);
	}
</style>