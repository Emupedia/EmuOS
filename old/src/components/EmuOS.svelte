<style>
	:global(body) {
		font-size: 20px;
	}
</style>

<script>
	import Demo from './Demo.svelte'

	export let development
	export let route

	console.log(development)
	console.log(route)
</script>

<Demo />