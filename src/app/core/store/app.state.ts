import { IApp } from './app.model';

export const initialAppState: IApp = {
	counterValue: 0,
	uiBlocker: {
		primaryText: 'Loading...',
		secondaryText: '',
	},
};
