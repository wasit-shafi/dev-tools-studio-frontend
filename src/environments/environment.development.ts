import { commonEnvironment } from './environment.common';

export const environment = {
	...commonEnvironment,
	baseUrl: 'http://localhost:3000/api',
	production: false,
	development: true,
	reCaptchaSiteKey: '6LeF8lcqAAAAAI3HmM1x5AQXUFiPVewrYKmTSxlj',
};
