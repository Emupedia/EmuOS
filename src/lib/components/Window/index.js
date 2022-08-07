import { default as Window } from '$lib/components/Window/Window.svelte'
import { default as TitleBar } from '$lib/components/Window/TitleBar.svelte'
import { default as StatusBar } from '$lib/components/Window/StatusBar.svelte'
import { default as ResizeControls } from '$lib/components/Window/ResizeHandles.svelte'

Window.TitleBar = TitleBar
Window.StatusBar = StatusBar
Window.ResizeHandles = ResizeControls

export default Window