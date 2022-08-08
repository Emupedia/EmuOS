<script>
	import { Desktop, Icons } from '$lib/components/Desktop'
	import { TaskBar } from '$lib/components/TaskBar'
	import { Window } from '$lib/components/Window'
</script>

<Desktop>
	<Icons>
		<div class="desktop-icon" data-x="0" data-y="0"><span>Icon 1</span></div>
		<div class="desktop-icon" data-x="0" data-y="0"><span>Icon 2</span></div>
		<div class="desktop-icon" data-x="0" data-y="0"><span>Icon 3</span></div>
		<div class="desktop-icon" data-x="0" data-y="0"><span>Icon 4</span></div>
	</Icons>
	<Window title="Notepad" status="Idle" x="50" y="50" width="170" height="100" buttons={['help', 'fullscreen', 'newtab', 'minimize', 'maximize', 'close']}>
		<br />Some content<br />is<br />here<br /><br /><br /><br />
	</Window>
	<TaskBar />
</Desktop>

<style global lang="scss">
	main {
		.icons {
			.desktop-icon {
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				background: lightblue;
				width: 100px;
				height: 100px;
				cursor: pointer;
				border-radius: 10px;
				padding: 1em;
				touch-action: none;
				transition: box-shadow 0.5s;

				&:hover {
					-webkit-box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.1);
					-moz-box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.1);
					box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.1);
				}

				&:nth-child(1) {
					top: 100px;
					left: 100px;
				}

				&:nth-child(2) {
					top: 30px;
					left: 300px;
				}

				&:nth-child(3) {
					top: 400px;
					left: 320px;
				}

				&:nth-child(4) {
					top: 250px;
					left: 200px;
				}
			}

			.selection {
				position: absolute;
				border-width: 1px;
				border-style: dotted;
				border-color: #ffff7f;
			}
		}
	}

	@supports (mix-blend-mode: difference) {
		main {
			.icons {
				.selection {
					border-color: #fff;
					mix-blend-mode: difference;
				}
			}
		}
	}
</style>