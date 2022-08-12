<script>
	import { Desktop, Icons } from '$lib/components/Desktop'
	import { TaskBar } from '$lib/components/TaskBar'
	import { Window } from '$lib/components/Window'
	import { Menu, MenuItem, MenuSeparator } from '$lib/components/Menu'
</script>

<Desktop>
	<Icons>
		<ul>
			<li class="desktop-icon" data-x="0" data-y="0"><span>Icon 1</span></li>
			<li class="desktop-icon" data-x="0" data-y="0"><span>Icon 2</span></li>
			<li class="desktop-icon" data-x="0" data-y="0"><span>Icon 3</span></li>
			<li class="desktop-icon" data-x="0" data-y="0"><span>Icon 4</span></li>
		</ul>
	</Icons>

	<Window title="Notepad" status="Idle" x="50" y="50" width="170" height="100"><br />Some content<br />is<br />here<br /><br /><br /><br /></Window>

	<TaskBar />

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
				box-shadow: none;
				transition: box-shadow 0.2s;
				pointer-events: auto;

				&:hover {
					-webkit-box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.2);
					-moz-box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.2);
					box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.2);
				}

				&.selected {
					//box-shadow: rgb(72 199 116) 0 0 3pt 3pt;
					-webkit-filter: grayscale(100%) brightness(30%) sepia(100%) hue-rotate(-180deg) saturate(700%) contrast(0.8);
					filter: grayscale(100%) brightness(30%) sepia(100%) hue-rotate(-180deg) saturate(700%) contrast(0.8);
					color: #fff;
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

				pointer-events: none;
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