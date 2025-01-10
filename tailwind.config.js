/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./src/**/*.{html,ts}'],
	theme: {
		screens: {
			'3xs': '300px',
			'2xs': '413px',
			xs: '526px',
			...defaultTheme.screens,
		},
		extend: {
			colors: {
				black: 'rgb(00 00 00 / <alpha-value>)',
				white: 'rgb(255 255 255 / <alpha-value>)',
				persianGreen: 'rgb(9 166 149 / <alpha-value>)',
				sunnyYellow: 'rgb(230 255 22 / <alpha-value>)',
				softPeach: 'rgb(238 283 283 / <alpha-value>)',
				caribbeanGreen: 'rgb(26 209 165 / <alpha-value>)', // color referred from daisyui logo
				orangePeel: 'rgb(255 153 3 / <alpha-value>)', // color referred from daisyui logo
			},
		},
	},
	plugins: [require('daisyui'), require('tailwindcss-primeui')],
	daisyui: {
		themes: ['light'],
	},
};
