<svelte:options tag="emuos-panel" />

<script>
	import { onMount } from 'svelte'
	import { addUnits } from '$lib/dom'

	export let padding = 1
	export let isContentEditable = false
	export let debug = false

	let mounted = false

	$: if (mounted) {
		padding = addUnits(padding)
	}

	onMount(() => {
		console.log('Panel.onMount')

		console.log(isContentEditable)

		mounted = true
	})
</script>

<article class="panel {$$props.class || ''}" class:debug {...$$restProps}>
	<section class="content" style="--padding: {padding}" contenteditable={isContentEditable}><slot>Panel</slot></section>
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

					padding: var(--padding);

					overflow: auto;
				}
			}

			&.has-title-bar {
				section {
					&.content {
						height: calc(100% - 18px);
						margin-top: 18px;
					}
				}
			}

			&.has-title-bar.has-status-bar {
				section {
					&.content {
						height: calc(100% - 18px);
						margin-top: 18px;
					}
				}
			}

			&.has-status-bar {
				padding-bottom: 18px;
			}

			&.debug {
				outline: 1px solid var(--color-debug);
				outline-offset: -1px;
			}
		}
	}
</style>