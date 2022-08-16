<!--suppress CheckImageSize -->

<script>
	export let x = 0
	export let y = 0
	export let title = ''
	export let shortcut = false
</script>

<li class="desktop-icon" data-x={x} data-y={y}>
	<button type="button" {title}>
		<figure>
			<picture>
				<source media="(min-resolution: 2.01x), (-webkit-min-device-pixel-ratio: 2.01)" srcset="/System/Icons/144x144/user.webp 3x" type="image/webp">
				<source media="(min-resolution: 1.01x), (-webkit-min-device-pixel-ratio: 1.01)" srcset="/System/Icons/96x96/user.webp 2x" type="image/webp">
				<source srcset="/System/Icons/48x48/user.webp" type="image/webp">
				<img width="48" height="48" alt="" loading="eager" decoding="async" draggable="false" fetchpriority="high" src="/System/Icons/48x48/user.png" srcset="/System/Icons/48x48/user.png, /System/Icons/96x96/user.png 2x, /System/Icons/144x144/user.png 3x">
			</picture>
			{#if shortcut}
				<picture>
					<source media="(min-resolution: 2.01x), (-webkit-min-device-pixel-ratio: 2.01)" srcset="/assets/images/icons/overlay/shortcut.png 3x" type="image/png">
					<source media="(min-resolution: 1.01x), (-webkit-min-device-pixel-ratio: 1.01)" srcset="/assets/images/icons/overlay/shortcut.png 2x" type="image/png">
					<source srcset="/assets/images/icons/overlay/shortcut.png" type="image/png">
					<img width="48" height="48" alt="" loading="eager" decoding="async" draggable="false" fetchpriority="high" src="/assets/images/icons/overlay/shortcut.png" srcset="/assets/images/icons/overlay/shortcut.png, /assets/images/icons/overlay/shortcut.png 2x, /assets/images/icons/overlay/shortcut.png 3x">
				</picture>
			{/if}
			<figcaption><span><slot>Icon</slot></span></figcaption>
		</figure>
	</button>
</li>

<style lang="scss">
	.desktop-icon {
		position: absolute;

		max-width: 90px;

		display: flex;
		justify-content: center;
		align-items: center;

		color: #fff;

		//box-shadow: none;
		//transition: box-shadow 0.2s;

		&:hover {
			//-webkit-box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.2);
			//-moz-box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.2);
			//box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.2);
			z-index: 1;

			picture {
				-webkit-filter: grayscale(100%) brightness(30%) sepia(100%) hue-rotate(-180deg) saturate(700%) contrast(0.8);
				filter: grayscale(100%) brightness(30%) sepia(100%) hue-rotate(-180deg) saturate(700%) contrast(0.8);
			}

			figcaption {
				span {
					background-color: #000080;
					color: #fff;

					&:after {
						position: absolute;
						display: block;
						content: '';
						left: 0;
						top: 0;
						width: 100%;
						height: 100%;
						outline: 1px dotted #ffff7f;
						outline-offset: -1px;
					}
				}
			}
		}

		&:global(.selected) {
			z-index: 1;

			picture {
				-webkit-filter: grayscale(100%) brightness(30%) sepia(100%) hue-rotate(-180deg) saturate(700%) contrast(0.8);
				filter: grayscale(100%) brightness(30%) sepia(100%) hue-rotate(-180deg) saturate(700%) contrast(0.8);
			}

			figcaption {
				span {
					background-color: #000080;
					color: #fff;

					&:after {
						position: absolute;
						display: block;
						content: '';
						left: 0;
						top: 0;
						width: 100%;
						height: 100%;
						outline: 1px dotted #ffff7f;
						outline-offset: -1px;
					}
				}
			}
		}

		button {
			position: relative;

			background-color: inherit;
			color: inherit;

			border: none;
			outline: none;
			appearance: none;
			touch-action: none;
			cursor: inherit;

			figure {
				display: flex;
				flex-direction: column;
				place-items: center;

				picture {
					height: 48px;
					width: 48px;

					margin: 0 auto 4px;

					background-color: #000;

					&:not(:first-of-type) {
						position: absolute;
					}
				}

				figcaption {
					span {
						position: relative;
						display: block;
						padding-left: 3px;
						padding-right: 2px;
					}
				}
			}
		}
	}
</style>