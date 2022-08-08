const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')

const isProd = process.env.NODE_ENV === 'production'

const config = {
	plugins: [
		tailwindcss(),
		autoprefixer,
		isProd && cssnano({
			preset: 'default'
		})
	]
}

module.exports = config