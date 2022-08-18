<script>
	import { Desktop } from '$lib/components/Desktop'
	import { Icons, Icon } from '$lib/components/Icons'
	import { TaskBar } from '$lib/components/TaskBar'
	import { Windows, Window } from '$lib/components/Windows'
	import { ContextMenu, ContextMenuItem, ContextMenuSeparator } from '$lib/components/ContextMenu'

	const onRefresh = () => location.reload()
</script>

<Desktop>
	<Icons>
		<Icon>My Computer</Icon>
		<Icon>Network Neighborhood</Icon>
		<Icon>Recycle Bin</Icon>
		<Icon shortcut>(C)</Icon>
		<Icon shortcut>Control Panel</Icon>
		<Icon shortcut>System</Icon>
	</Icons>

	<Windows>
		<Window x="50" y="50" width="170" height="100" title="Notepad" status="Idle" ><br />Some content<br />is<br />here<br /><br /><br /><br /></Window>
		<Window x="150" y="150" width="170" height="100" title="Notepad2" status="Idle" ><br />Some more content<br />is<br />here<br /><br /><br /><br /></Window>
	</Windows>

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