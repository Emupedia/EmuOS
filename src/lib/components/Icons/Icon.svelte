<!--suppress CheckImageSize, JSUnusedAssignment -->

<script>
	import { beforeUpdate, onMount, afterUpdate, onDestroy } from 'svelte'
	import { db } from '$lib/stores'
	import { interactable } from '$lib/interactable'
	import { getAll, hasClass, addClass, removeClass, addUnits, getProperty } from '$lib/dom'

	export let x = 0
	export let y = 0
	export let width = 32
	export let height = 32

	export let name = 'Icon'
	export let title = ''
	export let shortcut = false
	export let useTransform = false
	export let useTransform3D = true
	export let useGhost = true

	export let onClick = () => {
		console.log('Icon.onClick')
	}

	let icon
	let slot

	beforeUpdate(() => {
		console.log('Icon.beforeUpdate')

		if (x) x = addUnits(x || 0)
		if (y) y = addUnits(y || 0)
	})

	onMount(() => {
		console.log('Icon.onMount')

		if (typeof name === 'undefined') {
			name = slot.innerText
		}

		interactable(icon, { useGhost, onEnd: onMouseUp })
	})

	afterUpdate(() => {
		console.log('Icon.afterUpdate')
	})

	onDestroy(() => {
		console.log('Icon.onDestroy')
	})

	function onMouseDown() {
		console.log('Icon.onMouseDown')

		if (!hasClass(icon, 'selected')) {
			let unselect = getAll('.selected')

			for (const item of unselect) {
				removeClass(item, 'selected')
			}

			addClass(icon, 'selected')
		}
	}

	function onMouseUp(e, icons) {
		console.log('Icon.onMouseUp')

		if (typeof icons !== 'undefined' && icons?.length > 0) {
			icons?.forEach(el => {
				$db.desktop.icons.forEach((icon, i) => {
					if (icon.name === el.innerText) {
						icon.x = getProperty(el, 'x') || 0
						icon.y = getProperty(el, 'y') || 0

						$db.desktop.icons[i] = icon
					}
				})
			})
		}
	}
</script>

<svelte:options tag={null} />

<li bind:this={icon} class="icon {$$props.class || ''}" class:move={!useTransform && !useTransform3D} class:transform={useTransform} class:transform-3d={useTransform3D} on:mousedown={onMouseDown} on:click={onClick} style="--x: {x}; --y: {y};" {...$$restProps}>
	<button type="button" {title}>
		<figure>
			<picture style="width: {width}px; height: {height}px">
				<source media="(min-resolution: 2.01x), (-webkit-min-device-pixel-ratio: 2.01)" srcset="/assets/images/icons/default.png 3x" type="image/webp">
				<source media="(min-resolution: 1.01x), (-webkit-min-device-pixel-ratio: 1.01)" srcset="/assets/images/icons/default.png 2x" type="image/webp">
				<source srcset="/assets/images/icons/default.png" type="image/png">
				<img {width} {height} alt="" loading="eager" decoding="async" draggable="false" fetchpriority="high" src="/assets/images/icons/default.png" srcset="/assets/images/icons/default.png, /assets/images/icons/default.png 2x, /assets/images/icons/default.png 3x">
			</picture>
			{#if shortcut}
				<picture style="width: {width}px; height: {height}px">
					<source media="(min-resolution: 2.01x), (-webkit-min-device-pixel-ratio: 2.01)" srcset="/assets/images/icons/overlay/shortcut.png 3x" type="image/png">
					<source media="(min-resolution: 1.01x), (-webkit-min-device-pixel-ratio: 1.01)" srcset="/assets/images/icons/overlay/shortcut.png 2x" type="image/png">
					<source srcset="/assets/images/icons/overlay/shortcut.png" type="image/png">
					<img {width} {height} alt="" loading="eager" decoding="async" draggable="false" fetchpriority="high" src="/assets/images/icons/overlay/shortcut.png" srcset="/assets/images/icons/overlay/shortcut.png, /assets/images/icons/overlay/shortcut.png 2x, /assets/images/icons/overlay/shortcut.png 3x">
				</picture>
			{/if}
			<figcaption><span bind:this={slot}><slot name="name">{name}</slot></span></figcaption>
		</figure>
	</button>
</li>

<style lang="scss">
	.icon {
		display: flex;
		width: 70px;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		height: min-content;
		padding: 2px;

		color: #fff;

		//box-shadow: none;
		//transition: box-shadow 0.2s;

		button {
			position: relative;
			width: 100%;

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
					//height: 48px;
					//width: 48px;

					margin: 0 auto 4px;

					//background-color: #000;

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

		&.move {
			left: (var(--x));
			top: (var(--y));
		}

		&.transform {
			left: 0;
			top: 0;
			-webkit-transform: translate(var(--x), var(--y));
			transform: translate(var(--x), var(--y));
		}

		&.transform-3d {
			left: 0;
			top: 0;
			-webkit-transform: translate3d(var(--x), var(--y), 0);
			transform: translate3d(var(--x), var(--y), 0);
		}

		&.dragging {
			opacity: 0.5;

			z-index: 1;

			pointer-events: none;

			button {
				figure {
					figcaption {
						span {
							color: #000;
						}
					}
				}
			}
		}

		&:global(.ghost) {
			position: absolute;
			top: 0;
			left: 0;
		}

		&:global(.selected) {
			z-index: 1;

			button {
				figure {
					picture {
						-webkit-filter: grayscale(100%) brightness(30%) sepia(100%) hue-rotate(-180deg) saturate(700%) contrast(0.8);
						filter: grayscale(100%) brightness(30%) sepia(100%) hue-rotate(-180deg) saturate(700%) contrast(0.8);
					}

					figcaption {
						span {
							background-color: #000080;
							//color: #fff;

							&:after {
								position: absolute;
								content: '';
								left: 0;
								top: 0;
								width: 100%;
								height: 100%;
								outline: 1px dotted #ffff7f;
								outline-offset: -1px;

								@supports (mix-blend-mode: difference) {
									mix-blend-mode: difference;
									outline-color: #fff;
								}
							}
						}
					}
				}
			}
		}
	}
</style>