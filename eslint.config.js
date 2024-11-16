const tseslint = require('typescript-eslint');

const ngrx = require('@ngrx/eslint-plugin/v9');

module.exports = tseslint.config({
	files: ['**/*.ts'],
	extends: [
		// for more info refer : https://ngrx.io/guide/eslint-plugin#eslint-v9
		// 👇 Use all rules at once
		...ngrx.configs.all,
	],
	rules: {
		// 👇 Configure specific rules
		'@ngrx/with-state-no-arrays-at-root-level': 'warn',
	},
});
