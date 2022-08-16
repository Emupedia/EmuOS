<script>
	export let disabled = false
	export let debug = false
</script>

<li class="menu-item" class:disabled class:debug><slot>MenuItem</slot></li>

<style lang="scss">
	.menu-item {
		height: 16px;
		line-height: 16px;

		padding-left: 20px;
		padding-right: 20px;

		color: #000;

		&:hover {
			background-color: #000080;
			color: #fff;
		}

		&.disabled {
			color: #808080;

			&:hover {
				background-color: #000080;
				color: #808080;
			}
		}

		&.debug {
			outline: 1px solid var(--color-debug);
			outline-offset: -1px;
		}
	}
</style>