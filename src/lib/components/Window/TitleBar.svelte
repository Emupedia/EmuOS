<script>
	export let onMouseDown = () => {}
</script>

<div class="title-bar {$$props.class || ''}" on:mousedown={onMouseDown} {...$$restProps}><slot>TitleBar</slot></div>

<style lang="scss">
	.title-bar {
		color: #000;
	}
</style>