import { IUi } from '@coreModels/';
import { routerNavigatedAction } from '@ngrx/router-store';
import { createFeature, createReducer, on } from '@ngrx/store';

import { uiActions } from './ui.actions';
import { initialUiState } from './ui.state';

const reducer = createReducer(
	initialUiState,
	on(uiActions.showBlocker, (state, action): IUi => {
		return { ...state, blocker: { ...state.blocker, isVisible: true } };
	}),
	on(uiActions.hideBlocker, (state, action): IUi => {
		return { ...state, blocker: { ...state.blocker, isVisible: false } };
	}),
	on(uiActions.toggleMaskCredential, (state, action): IUi => {
		return { ...state, settings: { ...state.settings, maskCredential: !state.settings.maskCredential } };
	}),
	// resetting to initial auth state on router navigation

	on(routerNavigatedAction, (): IUi => {
		return initialUiState;
	})
);

export const uiFeature = createFeature({
	name: 'ui',
	reducer,
});
