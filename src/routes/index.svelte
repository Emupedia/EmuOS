<script>
	import { Desktop } from '$lib/components/Desktop'
	import { Icons, Icon } from '$lib/components/Icons'
	import { TaskBar } from '$lib/components/TaskBar'
	import { Windows, Window } from '$lib/components/Windows'
	import { Menu, MenuItem, MenuSeparator } from '$lib/components/ContextMenu'
</script>

<Desktop>
	<Icons>
		<Icon title="Test 1">My Computer</Icon>
		<Icon title="Test 2">Network Neighborhood</Icon>
		<Icon title="Test 3">Recycle Bin</Icon>
		<Icon title="Test 4" shortcut>(C)</Icon>
		<Icon title="Test 5" shortcut>Control Panel</Icon>
		<Icon title="Test 6" shortcut>System</Icon>
	</Icons>

	<Windows>
		<Window title="Notepad" status="Idle" x="50" y="50" width="170" height="100"><br />Some content<br />is<br />here<br /><br /><br /><br /></Window>
		<Window title="Notepad2" status="Idle" x="150" y="150" width="170" height="100"><br />Some more content<br />is<br />here<br /><br /><br /><br /></Window>
	</Windows>

	<Menu>
		<MenuItem>Arrange Icons</MenuItem>
		<MenuItem>Line up Icons</MenuItem>
		<MenuSeparator />
		<MenuItem disabled>Paste</MenuItem>
		<MenuItem disabled>Paste Shortcut</MenuItem>
		<MenuSeparator />
		<MenuItem>New</MenuItem>
		<MenuSeparator />
		<MenuItem>Properties</MenuItem>
	</Menu>
</Desktop>

<TaskBar />