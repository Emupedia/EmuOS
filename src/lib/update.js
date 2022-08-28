// noinspection JSUnusedGlobalSymbols

import { getVersion } from '$lib/api'

// noinspection PointlessArithmeticExpressionJS
const VERSION_CHECK_DELAY = 1 * 60 * 1000
const DEBUG = false

let currentVersion = 0
let checkedVersion = 0
let version_check_interval

export const checkVersion = options => {
	currentVersion = options?.version || 0

	clearInterval(version_check_interval)

	if (typeof options?.clear === 'undefined') {
		version_check_interval = setInterval(async () => {
			let version_api = await getVersion().catch(error => console.error(error))
			let version_data = await version_api?.json().catch(error => console.error(error))

			if (DEBUG) {
				console.info(`Checking for new updates`)
			}

			// noinspection JSUnresolvedVariable
			if (typeof version_data?.version !== 'undefined') {
				// noinspection JSUnresolvedVariable
				if (version_data?.version !== null) {
					// noinspection JSUnresolvedVariable
					if (version_data?.version !== '') {
						// noinspection JSUnresolvedVariable
						checkedVersion = version_data?.version || 0

						if (DEBUG) {
							// noinspection JSUnresolvedVariable
							console.info(`Current version ${currentVersion}`)
							console.info(`Checked version ${checkedVersion}`)
						}

						// noinspection JSUnresolvedVariable
						if (checkedVersion !== currentVersion) {
							if (DEBUG) {
								// noinspection JSUnresolvedVariable
								console.info(`New update available build ${checkedVersion}`)
							}

							if (typeof options?.callback === 'function') {
								// noinspection JSUnresolvedVariable
								options?.callback({ currentVersion, checkedVersion })
							}
						} else if (DEBUG) {
							console.info('No new updates')
						}
					}
				}
			}
		}, options?.interval || VERSION_CHECK_DELAY)
	}
}