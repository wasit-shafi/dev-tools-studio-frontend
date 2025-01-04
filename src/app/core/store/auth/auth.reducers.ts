import { authActions } from '@coreStore/';
import { initialAuthState } from '@coreStore/auth/auth.state';
import { routerNavigatedAction } from '@ngrx/router-store';
import { createFeature, createReducer, on } from '@ngrx/store';

const reducer = createReducer(
	initialAuthState,
	// signin

	on(authActions.signin, (state, action) => {
		return { ...state, isLoading: true };
	}),
	on(authActions.signinSuccess, (state, action) => {
		return { ...state, isLoading: false, currentUser: action.currentUser };
	}),
	on(authActions.signinFailure, (state, action) => {
		return { ...state, isLoading: false };
	}),
	// signout

	on(authActions.signout, (state, action) => {
		return { ...state, currentUser: null };
	}),
	// forgot password

	on(authActions.forgotPassword, (state, action) => {
		return { ...state, isLoading: true };
	}),
	on(authActions.forgotPasswordSuccess, (state, action) => {
		return { ...state, isLoading: false, forgotPasswordUi: { isEmailSent: true } };
	}),
	on(authActions.forgotPasswordFailure, (state, action) => {
		return { ...state, isLoading: false, forgotPasswordUi: { isEmailSent: false } };
	}),
	// reset password

	on(authActions.resetPassword, (state, action) => {
		return { ...state, isLoading: true };
	}),
	on(authActions.resetPasswordSuccess, (state, action) => {
		return { ...state, isLoading: false };
	}),
	on(authActions.resetPasswordFailure, (state, action) => {
		return { ...state, isLoading: false };
	}),
	// resetting to initial auth state on router navigation

	on(routerNavigatedAction, () => {
		return initialAuthState;
	})
);

export const authFeature = createFeature({
	name: 'auth',
	reducer,
});
