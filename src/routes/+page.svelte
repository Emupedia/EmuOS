<!--suppress JSUnusedAssignment, JSUnresolvedVariable -->

<svelte:options tag={null} />

<script>
	import { beforeUpdate, onMount, afterUpdate, onDestroy } from 'svelte'

	import { Desktop } from '$lib/components/Desktop'
	import { Icons, Icon } from '$lib/components/Icons'
	import { Button } from '$lib/components/Panel'
	import { TaskBar } from '$lib/components/TaskBar'
	import { Windows, Window } from '$lib/components/Windows'
	import { ContextMenu, ContextMenuItem, ContextMenuSeparator } from '$lib/components/ContextMenu'
	import { Toasts } from '$lib/components/Toasts'

	import { getGlobal } from '$lib/dom'
	import { db, toast } from '$lib/stores'
	import { variables } from '$lib/variables'
	import { icons as iconsData } from '$lib/data'

	import Close from '$lib/assets/images/icons/win9x-window-button-close.svg?raw'

	export let data = {}
	export let errors = {}

	if (variables?.GLOBAL_DEBUG) {
		console.log('+page.svelte')

		if (data && Object.keys(data).length > 0) {
			console.log(data)
		}

		if (errors && Object.keys(errors).length > 0) {
			console.log(errors)
		}
	}

	let version
	let icons

	const global = getGlobal()

	beforeUpdate(() => {
		console.log('Page.beforeUpdate')
	})

	onMount(() => {
		console.log('Page.onMount')
	})

	afterUpdate(() => {
		console.log('Page.afterUpdate')
	})

	onDestroy(() => {
		console.log('Page.onDestroy')
		unsubscribe()
	})

	const unsubscribe = db.subscribe(db => {
		console.log('Updated DB')
		console.log(db)
		version = db?.version || 0
		icons = db?.desktop?.icons || iconsData
	})

	if (data?.version !== 0) {
		$db.version = data?.version
	}

	// noinspection JSDeprecatedSymbols
	let closeIcon = global?.btoa(Close)

	const onRefresh = () => global?.location?.reload()

	const onUpdated = () => toast.open({ id: 1, msg: 'New update available, click here to reload', initial: 0, onclick: onRefresh })

	const onShowToastClick = () => toast.open({ msg: 'This is a toast!', pausable: true })

	const onResetIconsClick = () => ($db.desktop.icons = iconsData)
</script>

<Desktop {version} on:updated={onUpdated}>
	<Icons>
		{#each icons as icon, i(icon?.name)}
			<Icon x={icon?.x} y={icon?.y} shortcut={icon?.shortcut}>
				<svelte:fragment slot="name">{icon?.name}</svelte:fragment>
			</Icon>
		{/each}
	</Icons>

	<Windows>
		<Window x={100} y={80} width={170} height={100} padding={3} title={'Notepad'} showStatusBar={true} isContentEditable={true} status={'Idle'} ><br />Some content<br />is<br />here<br /><br /><br /><br /></Window>
		<Window x={140} y={200} width={170} height={100} padding={6} title={'Tools'}><Button onClick={onShowToastClick}>Show Toast</Button> <Button onClick={onResetIconsClick}>Reset Icons</Button></Window>
		<Window x={160} y={370} width={170} height={100} padding={6} showTitleBar={false}>No TitleBar, No StatusBar, Not Editable</Window>
	</Windows>

	<Toasts options={{ close: '', theme: { '--toastButtonBackground': `var(--color-background-panel) url('data:image/svg+xml;base64,${closeIcon}') 0.75px 1px / 13px 11px no-repeat`, '--toastButtonBackgroundActive': `var(--color-background-panel) url('data:image/svg+xml;base64,${closeIcon}') 0.75px 1px / 13px 11px no-repeat` } }} />

	<ContextMenu>
		<ContextMenuItem>Arrange Icons</ContextMenuItem>
		<ContextMenuItem>Line up Icons</ContextMenuItem>
		<ContextMenuSeparator />
		<ContextMenuItem onClick={onRefresh}>Refresh</ContextMenuItem>
		<ContextMenuSeparator />
		<ContextMenuItem disabled>Paste</ContextMenuItem>
		<ContextMenuItem disabled>Paste Shortcut</ContextMenuItem>
		<ContextMenuSeparator />
		<ContextMenuItem>New</ContextMenuItem>
		<ContextMenuSeparator />
		<ContextMenuItem>Properties</ContextMenuItem>
	</ContextMenu>
</Desktop>

<TaskBar />