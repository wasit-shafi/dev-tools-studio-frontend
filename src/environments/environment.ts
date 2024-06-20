import { commonEnvironment } from './environment.common';

export const environment = {
  ...commonEnvironment,
  production: true,
  baseUrl: 'http://localhost:3000/api/v1',
};
