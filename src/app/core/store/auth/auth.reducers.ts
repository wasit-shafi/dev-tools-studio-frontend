import { authActions } from '@coreStore/';
import { initialAuthState } from '@coreStore/auth/auth.state';
import { createFeature, createReducer, on } from '@ngrx/store';

const reducer = createReducer(
	initialAuthState,
	on(authActions.login, (state, action) => {
		return { ...state, isLoading: true };
	}),
	on(authActions.loginSuccess, (state, action) => {
		return { ...state, isLoading: false, currentUser: action.currentUser };
	}),
	on(authActions.loginFailure, (state, action) => {
		return { ...state, isLoading: false };
	}),
	on(authActions.logout, (state, action) => {
		return { ...state, currentUser: null };
	})
);

export const authFeature = createFeature({
	name: 'Auth',
	reducer,
});
