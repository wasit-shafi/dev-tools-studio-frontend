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
		extend: {},
	},
	plugins: [require('daisyui')],
};
