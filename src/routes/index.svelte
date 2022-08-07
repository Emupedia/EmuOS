<script>
	import Desktop from '$lib/components/Desktop'
	import TaskBar from '$lib/components/TaskBar'
	import Window from '$lib/components/Window'
</script>

<Desktop>
	<Window title="Notepad" x="100" y="100" width="100" height="100" buttons={['help', 'fullscreen', 'minimize', 'maximize', 'close']}>
		<br />Some content<br />is<br />here<br /><br /><br /><br />
	</Window>
	<TaskBar />
</Desktop>