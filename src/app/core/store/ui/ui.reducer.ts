import { createFeature, createReducer, on } from '@ngrx/store';
import { initialUiState } from './ui.state';
import { uiActions } from './ui.actions';

const reducer = createReducer(
	initialUiState,
	on(uiActions.blockerShow, (state, action) => {
		return { ...state };
	}),
	on(uiActions.blockerHide, (state, action) => {
		return { ...state };
	})
);

export const uiFeature = createFeature({
	name: 'Ui',
	reducer,
});
