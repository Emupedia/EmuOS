<script context="module">
	export const load = ({ error, status }) => {
		if (status === 404) {
			return {
				status: 302,
				redirect: '/'
			}
		}

		return {
			props: { error, status }
		}
	}
</script>

<script>
	export let error
	export let status
</script>

<div class="max-w-screen-xl container mx-auto grid place-items-center">
	<section class="p-8 border-gray-500 rounded">
		<h1 class="text-center text-4xl font-mono-mt-4">{status}</h1>
		<p class="text-center">{error.message}</p>
	</section>
</div>