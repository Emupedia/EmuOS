<!--suppress ES6UnusedImports, JSUnresolvedVariable, HtmlUnknownTarget -->
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
	<Route fallback>
		<table class="error">
			<tr>
				<td>
					<div class="error-wrapper">
						<h1>The page you are looking for is temporarily unavailable!</h1>
						<h2>
							Sorry, the page you are looking for is currently unavailable, please try again later.<br />
							These errors are monitored and will be fixed as soon as posible.<br />
							Thank you for understanding!
						</h2>
						<div class="error-container">
							<video muted autoplay loop controls>
								<source src="assets/videos/monkey.mp4" type="video/mp4">
								<source src="assets/videos/monkey.ogg" type="video/ogg">
								<img src="assets/videos/monkey.jpg" alt="" />
							</video>
						</div>
						<div class="error-caption">A team of highly trained monkeys has been dispatched to deal with this situation.</div>
					</div>
				</td>
			</tr>
		</table>
	</Route>
</Route>