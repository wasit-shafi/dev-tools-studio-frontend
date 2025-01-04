import { routerNavigatedAction } from '@ngrx/router-store';
import { createFeature, createReducer, on } from '@ngrx/store';

import { uiActions } from './ui.actions';
import { initialUiState } from './ui.state';

const reducer = createReducer(
	initialUiState,
	on(uiActions.showBlocker, (state, action) => {
		return { ...state, blocker: { ...state.blocker, isVisible: true } };
	}),
	on(uiActions.hideBlocker, (state, action) => {
		return { ...state, blocker: { ...state.blocker, isVisible: false } };
	}),
	// resetting to initial auth state on router navigation

	on(routerNavigatedAction, () => {
		return initialUiState;
	})
);

export const uiFeature = createFeature({
	name: 'ui',
	reducer,
});
