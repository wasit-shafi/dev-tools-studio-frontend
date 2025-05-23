import { IAuthState } from '@coreModels/';
import { authActions } from '@coreStore/';
import { initialAuthState } from '@coreStore/auth/auth.state';
import { routerNavigatedAction } from '@ngrx/router-store';
import { createFeature, createReducer, on } from '@ngrx/store';

const reducer = createReducer(
	initialAuthState,

	on(authActions.signinSuccess, (state, action): IAuthState => {
		return { ...state, currentUser: action.currentUser };
	}),
	on(authActions.signoutSuccess, (state, action): IAuthState => {
		return { ...state, currentUser: null };
	}),
	on(authActions.forgotPasswordSuccess, (state, action): IAuthState => {
		return { ...state, forgotPasswordUi: { isEmailSent: true } };
	}),
	on(authActions.forgotPasswordFailure, (state, action): IAuthState => {
		return { ...state, forgotPasswordUi: { isEmailSent: false } };
	}),
	on(authActions.autoSigninSuccess, (state, action): IAuthState => {
		return { ...state, currentUser: action.currentUser };
	}),
	on(authActions.profilePictureSuccess, (state, action): IAuthState => {
		return {
			...state,
			currentUser: state.currentUser ? { ...state.currentUser, profilePicture: action.profilePicture } : null,
		};
	})
	// resetting to initial auth state on router navigation

	// on(routerNavigatedAction, ():IAuthState => {
	// 	return initialAuthState;
	// })
);

export const authFeature = createFeature({
	name: 'auth',
	reducer,
});
