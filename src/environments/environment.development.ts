import { commonEnvironment } from './environment.common';

export const environment = {
	...commonEnvironment,
	production: false,
	baseUrl: 'http://localhost:3000/api/v1',
};
