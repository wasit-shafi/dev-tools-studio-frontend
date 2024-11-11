import { createReducer, on } from '@ngrx/store';
import { initialAppState } from './app.state';
import { appActions } from './app.actions';

const reducer = createReducer(
	initialAppState,
	on(appActions.uiBlockerShow, (state, action) => {
		return { ...state };
	}),
	on(appActions.uiBlockerHide, (state, action) => {
		return { ...state };
	})
);
