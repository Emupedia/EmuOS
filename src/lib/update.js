import { onDestroy } from 'svelte'
import { getUpdates } from '$lib/api'

let version_check_interval

export const checkUpdates = options => {
	// noinspection JSUnusedAssignment
	clearInterval(version_check_interval)

	if (typeof options?.clear === 'undefined') {
		version_check_interval = setInterval(async () => {
			let updates = await getUpdates().catch(error => console.error(error))
			let updates_data = await updates?.json().catch(error => console.error(error))

			console.info(`Checking for new updates`)

			// noinspection JSUnresolvedVariable
			if (typeof updates_data?.sha !== 'undefined' && typeof window?.$sys?.version !== 'undefined') {
				// noinspection JSUnresolvedVariable
				if (updates_data?.sha !== null && window?.$sys?.version !== null) {
					// noinspection JSUnresolvedVariable
					if (updates_data?.sha !== '' && window?.$sys?.version !== '' && window?.$sys?.version !== '{{ site.github.build_revision }}') {
						// noinspection JSUnresolvedVariable
						if (updates_data?.sha !== window?.$sys?.version) {
							if (typeof options?.callback === 'function') {
								// noinspection JSUnresolvedVariable
								console.info(`New update available build ${updates_data?.sha}`)
								options?.callback()
							}
						} else {
							console.info('No new updates')
						}
					}
				}
			}
		}, options?.interval || 15 * 60 * 1000)
	}

	onDestroy(() => clearInterval(version_check_interval))
}