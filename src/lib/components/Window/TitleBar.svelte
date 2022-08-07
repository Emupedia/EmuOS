<script>
	export let onMouseDown = () => {}
</script>

<header class="title-bar {$$props.class || ''}" on:mousedown={onMouseDown} {...$$restProps}><slot>TitleBar</slot></header>

<style lang="scss">
	.title-bar {
		background-color: #0a246a;
		background: -webkit-gradient(linear, left top, right top, color-stop(0, #0a246a), color-stop(100%, #a6caf0)) !important;
		background: -webkit-linear-gradient(left, #0a246a, #a6caf0) !important;

		color: #fff;

		overflow: hidden;

		&.dragging {
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;

			&.debug {
				border-bottom: 1px solid var(--color-debug-muted);
			}
		}

		&.debug {
			border-bottom: 1px solid var(--color-debug);
		}
	}
</style>