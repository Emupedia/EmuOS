<script>
	export let debug = false
</script>

<article class="panel {$$props.class || ''}" class:debug {...$$restProps}>
	<section class="content" contenteditable><slot>Panel</slot></section>
</article>

<style lang="scss">
	article {
		&.panel {
			height: 100%;

			background-color: var(--color-background-window-panel);

			//-moz-box-shadow: inset -1px -1px 0 #fff, inset 1px 1px 0 #7b7b7b;
			//-webkit-box-shadow: inset -1px -1px 0 #fff, inset 1px 1px 0 #7b7b7b;
			//box-shadow: inset -1px -1px 0 #fff, inset 1px 1px 0 #7b7b7b;

			color: #000;

			overflow: hidden;

			section {
				&.content {
					height: 100%;

					background-color: var(--color-white);

					border: 1px solid var(--color-white);
					border-top-color: #7b7b7b;
					border-left-color: #7b7b7b;

					overflow: auto;
				}
			}

			&.has-title-bar {
				height: calc(100% - 16px);

				section {
					&.content {
						margin-top: 16px;
					}
				}
			}

			&.has-status-bar {
				padding-bottom: 16px;
			}

			&.debug {
				outline: 1px solid var(--color-debug);
				outline-offset: -1px;
			}
		}
	}
</style>