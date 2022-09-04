<svelte:options tag="emuos-resize-handles" />

<div class="resize-handles {$$props.class || ''}" {...$$restProps}>
	<div class="top"></div>
	<div class="left"></div>
	<div class="right"></div>
	<div class="bottom"></div>
	<div class="top-left"></div>
	<div class="top-right"></div>
	<div class="bottom-left"></div>
	<div class="bottom-right"></div>
</div>

<style lang="scss">
	.resize-handles {
		//position: absolute;

		//width: 100%;
		//height: 100%;

		div {
			position: absolute;
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;

			&.top {
				width: 100%;
				height: 6px;
				top: -3px;
				left: 0;
				cursor: ns-resize;
			}

			&.top-left {
				width: 12px;
				height: 12px;
				top: -3px;
				left: -3px;
				cursor: nwse-resize;
			}

			&.top-right {
				width: 12px;
				height: 12px;
				top: -3px;
				right: -3px;
				cursor: nesw-resize;
			}

			&.left {
				width: 6px;
				height: 100%;
				top: 0;
				left: -3px;
				cursor: ew-resize;
			}

			&.right {
				width: 6px;
				height: 100%;
				top: 0;
				right: -3px;
				cursor: ew-resize;
			}

			&.bottom {
				width: 100%;
				height: 6px;
				bottom: -3px;
				left: 0;
				cursor: ns-resize;
			}

			&.bottom-left {
				width: 12px;
				height: 12px;
				left: -3px;
				bottom: -3px;
				cursor: nesw-resize;
			}

			&.bottom-right {
				width: 12px;
				height: 12px;
				right: -3px;
				bottom: -3px;
				cursor: nwse-resize;
			}
		}

		&.debug {
			div {
				outline: 1px solid var(--color-debug);
				outline-offset: -1px;

				&.top {
					background-color: #0c546044;
				}

				&.top-left {
					background-color: #0c546044;
				}

				&.top-right {
					background-color: #0c546044;
				}

				&.left {
					background-color: #0c546044;
				}

				&.right {
					background-color: #0c546044;
				}

				&.bottom {
					background-color: #0c546044;
				}

				&.bottom-left {
					background-color: #0c546044;
				}

				&.bottom-right {
					background-color: #0c546044;
				}
			}
		}
	}
</style>