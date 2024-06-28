import { commonEnvironment } from './environment.common';

export const environment = {
	...commonEnvironment,
	baseUrl: 'http://localhost:3000/api',
	production: true,
};
