<svelte:options tag="emuos-statusbar" />

<script>
	export let debug = false
</script>

<footer class="status-bar {$$props.class || ''}" class:debug {...$$restProps}><slot>StatusBar</slot></footer>

<style lang="scss">
	.status-bar {
		position: absolute;
		bottom: 5px;
		width: calc(100% - 8px);

		background-image: url(/assets/images/corner-resize.svg);
		background-repeat: no-repeat;
		background-position: right bottom;
		background-size: 12px;

		image-rendering: pixelated;

		height: 16px;
		line-height: 13px;

		padding: 2px;

		color: #000;

		-moz-box-shadow: inset -1px -1px 0 #fff, inset 1px 1px 0 #7b7b7b;
		-webkit-box-shadow: inset -1px -1px 0 #fff, inset 1px 1px 0 #7b7b7b;
		box-shadow: inset -1px -1px 0 #fff, inset 1px 1px 0 #7b7b7b;

		overflow: hidden;

		&.debug {
			border-top: 1px solid var(--color-debug);
		}
	}
</style>