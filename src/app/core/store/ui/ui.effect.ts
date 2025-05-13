import { exhaustMap, of } from 'rxjs';

import { inject } from '@angular/core';
import { authActions, uiActions } from '@coreStore/';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { userActions } from '@userStore/';

// ui blocker

export const showBlockerEffect = createEffect(
	(actions$ = inject(Actions)) => {
		return actions$.pipe(
			ofType(
				authActions.signin,
				authActions.signout,
				authActions.forgotPassword,
				authActions.resetPassword,
				userActions.addCredential,
				userActions.deleteCredential,
				userActions.editCredential
			),
			exhaustMap(() => {
				return of(uiActions.showBlocker());
			})
		);
	},
	{ functional: true }
);

export const hideBlockerEffect = createEffect(
	(actions$ = inject(Actions)) => {
		return actions$.pipe(
			ofType(
				authActions.signinSuccess,
				authActions.signinFailure,

				authActions.signoutSuccess,
				authActions.signoutFailure,

				authActions.forgotPasswordSuccess,
				authActions.forgotPasswordFailure,

				authActions.resetPasswordSuccess,
				authActions.resetPasswordFailure,

				userActions.addCredentialSuccess,
				userActions.addCredentialFailure,

				userActions.deleteCredentialSuccess,
				userActions.deleteCredentialFailure,

				userActions.editCredentialSuccess,
				userActions.editCredentialFailure
			),
			exhaustMap(() => {
				return of(uiActions.hideBlocker());
			})
		);
	},
	{ functional: true }
);
