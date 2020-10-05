<!--suppress ES6UnusedImports, JSUnresolvedVariable -->
<script>
	import { Route, router } from 'tinro'
	import EmuOS from './components/EmuOS.svelte'

	if (window.$sys.browser.isIE) {
		document.documentElement.className += ' engine-trident'
	} else if (window.$sys.browser.isEdgeHTML) {
		document.documentElement.className +=  ' engine-edgehtml'
	} else if (window.$sys.browser.isChrome || window.$sys.browser.isOperaBlink || window.$sys.browser.isEdgeBlink || window.$sys.browser.isChromium) {
		document.documentElement.className += ' engine-blink'
	} else if (window.$sys.browser.isSafari || window.$sys.browser.isOperaPresto) {
		document.documentElement.className += ' engine-webkit'
	} else if (window.$sys.browser.isFirefox || window.$sys.browser.isPaleMoon || window.$sys.browser.isBasilisk || window.$sys.browser.isKMeleon || window.$sys.browser.isNetscape) {
		document.documentElement.className += ' engine-gecko'
	} else {
		document.documentElement.className += ' engine-other'
	}

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