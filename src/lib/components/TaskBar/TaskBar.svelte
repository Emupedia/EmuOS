<script>
	export let type = 'bottom'
	export let debug = false
</script>

<svelte:options tag={null} />

<aside class="taskbar {type}" class:debug>
	<nav><slot>TaskBar</slot></nav>
</aside>

<style lang="scss">
	aside {
		&.taskbar {
			position: absolute;

			background-color: var(--color-background-taskbar);
			color: #fff;

			overflow: hidden;

			z-index: 3;

			&.top {
				height: 27px;

				top: 0;
				left: 0;
				right: 0;

				border-bottom: 1px solid var(--color-white);
				border-bottom-style: ridge;
			}

			&.bottom {
				height: 28px;

				left: 0;
				right: 0;
				bottom: 0;

				border-top: 1px solid var(--color-white);
				border-top-style: ridge;
			}

			&.left {
				width: 100px;

				top: 0;
				left: 0;
				bottom: 0;

				border-right: 1px solid var(--color-white);
				border-right-style: ridge;
			}

			&.right {
				width: 100px;

				top: 0;
				right: 0;
				bottom: 0;

				border-left: 1px solid var(--color-white);
				border-left-style: ridge;
			}

			&.debug {
				outline: 1px solid var(--color-debug);
				outline-offset: -1px;
			}
		}
	}
</style>