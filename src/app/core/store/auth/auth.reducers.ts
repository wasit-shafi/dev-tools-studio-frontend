import { authActions } from '@coreStore/';
import { initialAuthState } from '@coreStore/auth/auth.state';
import { createFeature, createReducer, on } from '@ngrx/store';

const reducer = createReducer(
	initialAuthState,
	on(authActions.signin, (state, action) => {
		return { ...state, isLoading: true };
	}),
	on(authActions.signinSuccess, (state, action) => {
		return { ...state, isLoading: false, currentUser: action.currentUser };
	}),
	on(authActions.signinFailure, (state, action) => {
		return { ...state, isLoading: false };
	}),
	on(authActions.signout, (state, action) => {
		return { ...state, currentUser: null };
	}),
	on(authActions.resetPassword, (state, action) => {
		return { ...state, isLoading: true };
	}),
	on(authActions.resetPasswordSuccess, (state, action) => {
		return { ...state, isLoading: false };
	}),
	on(authActions.resetPasswordFailure, (state, action) => {
		return { ...state, isLoading: false };
	})
);

export const authFeature = createFeature({
	name: 'auth',
	reducer,
});
