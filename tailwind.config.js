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
			},
		},
	},
	plugins: [require('daisyui')],
};
