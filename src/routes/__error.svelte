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

<svelte:head>
	<title>EmuOS v2.0 - Error!</title>
</svelte:head>

<table class="error">
	<tbody>
	<tr>
		<td>
			<div class="error-wrapper">
				<h1>The page you are looking for is temporarily unavailable!</h1>
				<h2>Sorry, the page you are looking for is currently unavailable, please try again later.<br />These errors are monitored and will be fixed as soon as posible.<br />Thank you for understanding!</h2>
				{#if status && !error}
					<h3>Error {status}</h3>
				{:else if !status && error}
					<h3>Error {error?.message}</h3>
				{:else if status && error}
					<h3>Error {status}: {error?.message}</h3>
				{/if}
				<div class="error-container">
					<video muted autoplay loop controls>
						<source src="/assets/videos/monkey.mp4" type="video/mp4">
						<source src="/assets/videos/monkey.ogg" type="video/ogg">
						<img src="/assets/videos/monkey.jpg" alt="" />
					</video>
				</div>
				<div class="error-caption">A team of highly trained monkeys has been dispatched to deal with this situation.</div>
			</div>
		</td>
	</tr>
	</tbody>
</table>