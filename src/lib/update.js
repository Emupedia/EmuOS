import { getUpdates } from '$lib/api'

const VERSION_CHECK_DELAY = 15 * 60 * 1000
const debug = false

let currentVersion = 0
let checkedVersion = 0
let version_check_interval

export const checkUpdates = options => {
	// noinspection JSUnusedAssignment
	clearInterval(version_check_interval)

	if (typeof options?.clear === 'undefined') {
		currentVersion = window?.$sys?.version && window?.$sys?.version !== '' && window?.$sys?.version !== '{{ site.github.build_revision }}' ? window?.$sys?.version || 0 : 0

		version_check_interval = setInterval(async () => {
			let updates = await getUpdates().catch(error => console.error(error))
			let updates_data = await updates?.json().catch(error => console.error(error))

			if (debug) {
				console.info(`Checking for new updates`)
			}

			// noinspection JSUnresolvedVariable
			if (typeof updates_data?.sha !== 'undefined') {
				// noinspection JSUnresolvedVariable
				if (updates_data?.sha !== null) {
					// noinspection JSUnresolvedVariable
					if (updates_data?.sha !== '') {
						// noinspection JSUnresolvedVariable
						checkedVersion = updates_data?.sha || 0
						// noinspection JSUnresolvedVariable
						if (updates_data?.sha !== currentVersion) {
							if (debug) {
								// noinspection JSUnresolvedVariable
								console.info(`New update available build ${updates_data?.sha}`)
							}

							if (typeof options?.callback === 'function') {
								// noinspection JSUnresolvedVariable
								options?.callback(updates_data?.sha)
							}
						} else if (debug) {
							console.info('No new updates')
						}
					}
				}
			}
		}, options?.interval || VERSION_CHECK_DELAY)
	}

	return { currentVersion, checkedVersion }
}