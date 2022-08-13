<script>
	import { Desktop, Icons, Icon } from '$lib/components/Desktop'
	import { TaskBar } from '$lib/components/TaskBar'
	import { Window } from '$lib/components/Window'
	import { Menu, MenuItem, MenuSeparator } from '$lib/components/Menu'
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

	<Window title="Notepad" status="Idle" x="50" y="50" width="170" height="100"><br />Some content<br />is<br />here<br /><br /><br /><br /></Window>

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

<style global lang="scss">
	.desktop {
		.icons {
			.desktop-icon {
				&:nth-child(1) {
					top: 100px;
					left: 400px;
				}

				&:nth-child(2) {
					top: 30px;
					left: 300px;
				}

				&:nth-child(3) {
					top: 200px;
					left: 320px;
				}

				&:nth-child(4) {
					top: 250px;
					left: 200px;
				}

				&:nth-child(5) {
					top: 375px;
					left: 220px;
				}

				&:nth-child(6) {
					top: 500px;
					left: 250px;
				}
			}
		}
	}

	@supports (mix-blend-mode: difference) {
		.desktop {
			nav {
				.icons {
					.selection {
						border-color: #fff;
						mix-blend-mode: difference;
					}
				}
			}
		}
	}

	@supports (mix-blend-mode: difference) {
		.desktop {
			nav {
				.icons {
					.desktop-icon {
						&.selected {
							button {
								figure {
									figcaption {
										span {
											&:after {
												outline-color: #fff;
												mix-blend-mode: difference;
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
</style>