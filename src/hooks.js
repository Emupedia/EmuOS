import * as cookie from 'cookie'

import * as colorette from 'colorette'
import { createColorize } from 'colorize-template'

const c = createColorize(colorette)

console.log(
c`                                   
                                    
     {yellowBright ╔═╗╔╦╗╦ ╦╔═╗╔═╗╔╦═╗╦╔═╗}        
     {yellowBright ╠═ ║║║║ ║╠═╝╠═  ║ ║║╠═╣}        
     {yellowBright ╚═╝╩ ╩╚═╝╩  ╚═╝═╩═╝╩╩ ╩}        
         {greenBright ╔═╗╔╦╗╦ ╦╔═╗╔═╗}            
         {greenBright ╠═ ║║║║ ║║ ║╚═╗}            
         {greenBright ╚═╝╩ ╩╚═╝╚═╝╚═╝}            
              {cyanBright v2.0}                  
                                    `)

export const handle = async ({ event, resolve }) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '')
	event.locals.gid = cookies['gid'] || crypto.randomUUID()

	const response = await resolve(event)

	if (!cookies['gid']) {
		// if this is the first time the user has visited this app,
		// set a cookie so that we recognise them when they return
		response.headers.set(
			'set-cookie',
			cookie.serialize('gid', event.locals.gid, {
				path: '/',
				httpOnly: true,
				sameSite: true,
				secure: true
			})
		)
	}

	return response
}