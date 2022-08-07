<script>
	export let debug = false
</script>

<footer class="status-bar {$$props.class || ''}" class:debug {...$$restProps}><slot>StatusBar</slot></footer>

<style lang="scss">
	.status-bar {
		color: #fff;

		overflow: hidden;

		&.dragging {
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;

			&.debug {
				border-top: 1px solid var(--color-debug-muted);
			}
		}

		&.debug {
			border-top: 1px solid var(--color-debug);
		}
	}
</style>