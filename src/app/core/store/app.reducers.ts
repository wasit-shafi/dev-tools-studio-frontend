import { initialAppState } from '@coreStore/';
import { createFeature, createReducer, on } from '@ngrx/store';

const reducer = createReducer(initialAppState);

export const appFeature = createFeature({
	name: 'App',
	reducer,
	extraSelectors: (state) => {
		// create extra selector here...
		return {};
	},
});
