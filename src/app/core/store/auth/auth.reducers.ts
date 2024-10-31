import { authActions } from '@coreStore/';
import { initialAuthState } from '@coreStore/auth/auth.state';
import { createFeature, createReducer, on } from '@ngrx/store';

const reducer = createReducer(
	initialAuthState,
	on(authActions.login, (state, action) => {
		console.log(action);
		return { ...state, isLoading: true };
	}),
	on(authActions.loginSuccess, (state, action) => {
		console.log(action);

		return { ...state, isLoading: false };
	}),
	on(authActions.loginFailure, (state, action) => {
		console.log(action);
		return { ...state, isLoading: false };
	})
);

export const authFeature = createFeature({
	name: 'Auth',
	reducer,
});
