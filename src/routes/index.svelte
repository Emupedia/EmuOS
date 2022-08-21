<script>
	import { Desktop } from '$lib/components/Desktop'
	import { Icons, Icon } from '$lib/components/Icons'
	import { Button } from '$lib/components/Panel'
	import { TaskBar } from '$lib/components/TaskBar'
	import { Windows, Window } from '$lib/components/Windows'
	import { ContextMenu, ContextMenuItem, ContextMenuSeparator } from '$lib/components/ContextMenu'
	import { Toasts, toast } from '$lib/components/Toasts'
	import Close from '$lib/assets/images/icons/win9x-window-button-close.svg?raw'

	const onRefresh = () => location.reload()

	const onUpdated = () => toast.push({ msg: 'New update available, click here to reload', initial: 0 })

	const onClick = () => toast.push({ msg: 'This is a toast!', initial: 0, pausable: true })
</script>

<Desktop on:updated={onUpdated}>
	<Icons>
		<Icon>My Computer</Icon>
		<Icon>Network Neighborhood</Icon>
		<Icon>Recycle Bin</Icon>
		<Icon shortcut>(C)</Icon>
		<Icon shortcut>Control Panel</Icon>
		<Icon shortcut>System</Icon>
	</Icons>

	<Windows>
		<Window x="150" y="150" width="170" height="100" title="Notepad" status="Idle" ><br />Some content<br />is<br />here<br /><br /><br /><br /></Window>
		<Window x="250" y="250" width="170" height="100" padding="6" title="Notepad2" status="Idle" ><Button onClick={onClick}>Show Toast</Button></Window>
	</Windows>

	<Toasts options={{close: Close}} />

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