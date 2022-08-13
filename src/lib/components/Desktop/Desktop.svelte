<script>
	export let debug = false
</script>

<main class="desktop" class:debug>
	<slot />
</main>

<style lang="scss">
	.desktop {
		height: calc(100% - 28px);

		background-color: var(--color-background-desktop);

		&.debug {
			outline: 1px solid var(--color-debug);
			outline-offset: -1px;
		}
	}
</style>