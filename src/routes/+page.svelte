<!--suppress JSUnusedAssignment -->

<script>
	import { Desktop } from '$lib/components/Desktop'
	import { Icons, Icon } from '$lib/components/Icons'
	import { Button } from '$lib/components/Panel'
	import { TaskBar } from '$lib/components/TaskBar'
	import { Windows, Window } from '$lib/components/Windows'
	import { ContextMenu, ContextMenuItem, ContextMenuSeparator } from '$lib/components/ContextMenu'
	import { Toasts, toast } from '$lib/components/Toasts'
	import { getGlobal } from '$lib/dom'
	import { variables } from '$lib/variables'

	import Close from '$lib/assets/images/icons/win9x-window-button-close.svg?raw'

	export let data = {}
	export let errors = {}

	if (variables.GLOBAL_DEBUG) {
		console.log('+page.svelte')

		if (Object.keys(data).length > 0) {
			console.log(data)
		}

		if (Object.keys(errors).length > 0) {
			console.log(errors)
		}
	}

	const global = getGlobal()

	let version = 0
	$: ({ version = 0 } = data)

	// noinspection JSDeprecatedSymbols
	let closeIcon = global.btoa(Close)

	const onRefresh = () => global.location.reload()

	const onUpdated = () => toast.open({ id: 1, msg: 'New update available, click here to reload', initial: 0, onclick: onRefresh })

	const onClick = () => toast.open({ msg: 'This is a toast!', initial: 0, pausable: true })
</script>

<Desktop {version} on:updated={onUpdated}>
	<Icons>
		<Icon>My Computer</Icon>
		<Icon>Network Neighborhood</Icon>
		<Icon>Recycle Bin</Icon>
		<Icon shortcut>(C)</Icon>
		<Icon shortcut>Control Panel</Icon>
		<Icon shortcut>System</Icon>
	</Icons>

	<Windows>
		<Window x="100" y="80" width="170" height="100" title="Notepad" status="Idle" ><br />Some content<br />is<br />here<br /><br /><br /><br /></Window>
		<Window x="140" y="200" width="170" height="100" padding="6" title="Notepad2" status="Idle" ><Button onClick={onClick}>Show Toast</Button></Window>
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