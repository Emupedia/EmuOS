<script>
	import {Route} from 'tinro';

	console.log(`
╔═╗╔╦╗╦ ╦╔═╗╔═╗
╠═ ║║║║ ║║ ║╚═╗
╚═╝╩ ╩╚═╝╚═╝╚═╝`)

	document.getElementsByTagName('body')[0].classList.remove('boot')

	if (document.getElementsByClassName('emuos-startup').length) {
		document.getElementsByClassName('emuos-startup')[0].remove()
	}

	if (document.getElementsByClassName('emuos-boot').length) {
		document.getElementsByClassName('emuos-boot')[0].remove()
	}

	const themes = ['', 'dark-theme', 'light-theme']
	const icons = ['⭐', '🌙', '🌞']
	let index = 0

	function changeTheme() {
		let previousTheme = themes[index]
		index = (index + 1) % themes.length
		let currentTheme = themes[index]

		if (previousTheme !== '') {
			document.getElementsByTagName('body')[0].classList.remove(previousTheme)
		}

		if (currentTheme !== '') {
			document.getElementsByTagName('body')[0].classList.add(currentTheme)
		}
	}
</script>

<h1>Hello world</h1>
<button on:click="{changeTheme}">{icons[index]}</button>

<nav>
    <a href="/emuos/">Home</a>
    <a href="/emuos/portfolio">Portfolio</a>
    <a href="/emuos/contacts">Contacts</a>
</nav>

<Route path="/emuos/*">
	<Route path="/"><h1>It is main page</h1></Route>
	<Route path="/portfolio/*">
		<Route path="/">
			<h1>Portfolio introduction</h1>
			<nav>
				<a href="/emuos/portfolio/sites">Sites</a>
				<a href="/emuos/portfolio/photos">Photos</a>
			</nav>
		</Route>
		<Route path="/sites"><h1>Portfolio: Sites</h1></Route>
		<Route path="/photos"><h1>Portfolio: Photos</h1></Route>
	</Route>
	<Route fallback>No page found</Route>
</Route>

<svelte:head>
	<!--suppress CssUnresolvedCustomProperty, CssUnusedSymbol -->
	<style>
		:root {
			--background-color: #a19585;
			--text-color: #f7f7f7;
		}

		.light-theme {
			--background-color: #fffaf4;
			--text-color: #201f20;
		}

		.dark-theme {
			--background-color: #201f20;
			--text-color: #fffaf4;
		}

		.emuos {
			background-color: var(--background-color);
			color: var(--text-color);
		}
	</style>
</svelte:head>