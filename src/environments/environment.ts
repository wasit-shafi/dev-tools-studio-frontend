import { commonEnvironment } from './environment.common';

export const environment = {
	...commonEnvironment,
	baseUrl: 'http://localhost:3000/api',
	production: true,
	development: false,
	reCaptchaSiteKey: '6LfeBlgqAAAAABpR4eTylKY2gn2qVa5TOAFS7nZf',
};
