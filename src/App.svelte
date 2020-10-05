<!--suppress ES6UnusedImports, JSUnresolvedVariable -->
<script>
	import { Route, router } from 'tinro'
	import EmuOS from './components/EmuOS.svelte'

	let development = typeof dev === 'undefined' ? undefined : dev
	let route = typeof $router === 'undefined' ? undefined : $router

	console.log($router)
	console.log(development)
</script>

<Route path="/*">
	<Route path="/"><EmuOS development={development} route={route} /></Route>
	<Route path="/emuos/"><EmuOS development={development} route={route} /></Route>
	<Route fallback>No page found</Route>
</Route>