<script>
	import { getGlobal } from '$lib/dom'

	import Minimize from '$lib/assets/images/icons/win9x-window-button-minimize.svg?raw'
	import Maximize from '$lib/assets/images/icons/win9x-window-button-maximize.svg?raw'
	import Restore from '$lib/assets/images/icons/win9x-window-button-restore.svg?raw'
	import Close from '$lib/assets/images/icons/win9x-window-button-close.svg?raw'
	import Help from '$lib/assets/images/icons/win9x-window-button-help.svg?raw'
	import Fullscreen from '$lib/assets/images/icons/emuos-fullscreen.svg?raw'
	import NewTab from '$lib/assets/images/icons/emuos-new-tab.svg?raw'

	export let title = false
	export let icon = false
	export let type = ''
	export let onClick = () => {}

	const global = getGlobal()

	let cls = false
	let style = false
	let iconSVG = ''

	icon ? cls = icon.toLowerCase() : ''
	!title ? title = icon : ''

	switch (icon) {
		case 'Minimize':
			// noinspection JSDeprecatedSymbols
			iconSVG = global.btoa(Minimize)
			break;
		case 'Maximize':
			// noinspection JSDeprecatedSymbols
			iconSVG = global.btoa(Maximize)
			break;
		case 'Restore':
			// noinspection JSDeprecatedSymbols
			iconSVG = global.btoa(Restore)
			break;
		case 'Close':
			// noinspection JSDeprecatedSymbols
			iconSVG = global.btoa(Close)
			break;
		case 'Help':
			// noinspection JSDeprecatedSymbols
			iconSVG = global.btoa(Help)
			break;
		case 'Fullscreen':
			// noinspection JSDeprecatedSymbols
			iconSVG = global.btoa(Fullscreen)
			break;
		case 'NewTab':
			cls = 'new-tab'
			// noinspection JSDeprecatedSymbols
			iconSVG = global.btoa(NewTab)
			break;
	}

	if (icon) {
		style = `--icon: url('data:image/svg+xml;base64,${iconSVG}');`
	}
</script>

<button class={cls} class:button-icon={type === 'icon'} {style} type="button" {title} on:click={onClick} {...$$restProps}><slot /></button>

<style lang="scss">
	button {
		//width: 16px;
		//height: 14px;

		background-color: var(--color-background-panel);
		background-image: var(--icon);
		background-position: 1px 1px;
		background-repeat: no-repeat;
		background-size: 13px 11px;

		padding: 6px 6px;
		border: none;

		user-select: none;
		appearance: none;
		-webkit-tap-highlight-color: transparent;

		overflow: hidden;

		cursor: pointer !important;

		-moz-box-shadow: inset -1px -1px 0 #000, inset 1px 1px 0 #fff, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf;
		-webkit-box-shadow: inset -1px -1px 0 #000, inset 1px 1px 0 #fff, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf;
		box-shadow: inset -1px -1px 0 #000, inset 1px 1px 0 #fff, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf;

		&:active {
			-moz-box-shadow: inset -1px -1px 0 #fff, inset 1px 1px 0 #000, inset -2px -2px 0 #dfdfdf, inset 2px 2px 0 #808080;
			-webkit-box-shadow: inset -1px -1px 0 #fff, inset 1px 1px 0 #000, inset -2px -2px 0 #dfdfdf, inset 2px 2px 0 #808080;
			box-shadow: inset -1px -1px 0 #fff, inset 1px 1px 0 #000, inset -2px -2px 0 #dfdfdf, inset 2px 2px 0 #808080;
		}

		&.button-icon {
			width: 16px;
			height: 14px;
			padding: 0;
			text-indent: -99999px;
		}

		&.minimize {
			margin-left: 2px;
		}

		&.close {
			margin-left: 2px;
		}

		&:not(:disabled) {
			cursor: pointer;
		}
	}
</style>