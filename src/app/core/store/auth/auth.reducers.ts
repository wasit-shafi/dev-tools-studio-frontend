import { IAuthState } from '@coreModels/';
import { authActions } from '@coreStore/';
import { initialAuthState } from '@coreStore/auth/auth.state';
import { routerNavigatedAction } from '@ngrx/router-store';
import { createFeature, createReducer, on } from '@ngrx/store';

const reducer = createReducer(
	initialAuthState,
	// signin

	// on(authActions.signin, (state, action): IAuthState => {
	// 	return { ...state };
	// }),
	on(authActions.signinSuccess, (state, action): IAuthState => {
		return { ...state, currentUser: action.currentUser };
	}),
	// on(authActions.signinFailure, (state, action): IAuthState => {
	// 	return { ...state };
	// }),
	// signout

	// on(authActions.signout, (state, action): IAuthState => {
	// 	return { ...state };
	// }),
	on(authActions.signoutSuccess, (state, action): IAuthState => {
		return { ...state, currentUser: null };
	}),
	// on(authActions.signoutFailure, (state, action): IAuthState => {
	// 	return { ...state };
	// }),
	// forgot password

	// on(authActions.forgotPassword, (state, action): IAuthState => {
	// 	return { ...state };
	// }),
	on(authActions.forgotPasswordSuccess, (state, action): IAuthState => {
		return { ...state, forgotPasswordUi: { isEmailSent: true } };
	}),
	on(authActions.forgotPasswordFailure, (state, action): IAuthState => {
		return { ...state, forgotPasswordUi: { isEmailSent: false } };
	})
	// reset password

	// on(authActions.resetPassword, (state, action): IAuthState => {
	// 	return { ...state };
	// }),
	// on(authActions.resetPasswordSuccess, (state, action): IAuthState => {
	// 	return { ...state };
	// }),
	// on(authActions.resetPasswordFailure, (state, action): IAuthState => {
	// 	return { ...state };
	// })
	// resetting to initial auth state on router navigation

	// on(routerNavigatedAction, ():IAuthState => {
	// 	return initialAuthState;
	// })
);

export const authFeature = createFeature({
	name: 'auth',
	reducer,
});
