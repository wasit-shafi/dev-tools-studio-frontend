import { catchError, exhaustMap, map, of, tap } from 'rxjs';

import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, PersistanceService, ToastService } from '@coreServices/';
import { Constants } from '@coreShared/';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { authActions } from './auth.actions';
import { uiActions } from '@coreStore/';

export const signinEffect = createEffect(
	(
		actions$ = inject(Actions),
		authService = inject(AuthService),
		constants = inject(Constants),
		router = inject(Router)
	) => {
		return actions$.pipe(
			ofType(authActions.signin),
			exhaustMap(({ email, password, reCaptchaResponse }) => {
				return authService.postSignin({ email, password, reCaptchaResponse }).pipe(
					map((response: any) => {
						const data = { currentUser: response.data };
						return authActions.signinSuccess(data);
					}),
					catchError((errorResponse: HttpErrorResponse) => {
						return of(authActions.signinFailure(errorResponse));
					})
				);
			})
		);
	},
	{ functional: true }
);

export const signinSuccessEffect = createEffect(
	(actions$ = inject(Actions), persistanceService = inject(PersistanceService), constants = inject(Constants)) => {
		return actions$.pipe(
			ofType(authActions.signinSuccess),
			tap((currentUser: any) => {
				const { authToken = '', refreshToken = '' } = currentUser;

				persistanceService.set(constants.LOCAL_STORAGE_KEYS.ACCESS_TOKEN, authToken);
				persistanceService.set(constants.LOCAL_STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
			})
		);
	},
	{ functional: true, dispatch: false }
);

export const redirectAfterSigninEffect = createEffect(
	(constants = inject(Constants), actions$ = inject(Actions), router = inject(Router)) => {
		return actions$.pipe(
			ofType(authActions.signinSuccess),
			tap(() => {
				router.navigate([constants.ROUTES.DASHBOARD]);
			})
		);
	},
	{ functional: true, dispatch: false }
);

export const signinFailureEffect = createEffect(
	(
		actions$ = inject(Actions),
		authService = inject(AuthService),
		constants = inject(Constants),
		router = inject(Router),
		toastService = inject(ToastService)
	) => {
		return actions$.pipe(
			ofType(authActions.signinFailure),
			tap((error: any) => {
				authService.handleResetSigninReCaptcha();

				toastService.enqueueToastNotification({
					message: error.error.message || error.message,
					type: constants.ALERT_TYPE.ERROR,
				});
			})
		);
	},
	{ functional: true, dispatch: false }
);

export const signoutEffect = createEffect(
	(
		actions$ = inject(Actions),
		constants = inject(Constants),
		persistanceService = inject(PersistanceService),
		router = inject(Router)
	) => {
		return actions$.pipe(
			ofType(authActions.signout),
			tap(() => {
				persistanceService.remove(constants.LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
				persistanceService.remove(constants.LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
				router.navigate([constants.ROUTES.ROOT]);
			})
		);
	},
	{ functional: true, dispatch: false }
);

export const resetPasswordEffect = createEffect(
	(
		actions$ = inject(Actions),
		authService = inject(AuthService),
		constants = inject(Constants),
		router = inject(Router)
	) => {
		return actions$.pipe(
			ofType(authActions.resetPassword),
			exhaustMap(({ email, reCaptchaResponse }) => {
				return authService.postResetPassword({ email, reCaptchaResponse }).pipe(
					map((response) => {
						return authActions.resetPasswordSuccess({ currentUser: response });
					}),
					catchError((errorResponse: HttpErrorResponse) => {
						return of(authActions.resetPasswordFailure(errorResponse));
					})
				);
			})
		);
	},
	{ functional: true }
);

export const resetPasswordSuccessEffect = createEffect(
	(actions$ = inject(Actions), persistanceService = inject(PersistanceService), constants = inject(Constants)) => {
		return actions$.pipe(
			ofType(authActions.resetPasswordSuccess),
			tap((currentUser: any) => {
				const { authToken = '', refreshToken = '' } = currentUser;
				persistanceService.set(constants.LOCAL_STORAGE_KEYS.ACCESS_TOKEN, authToken);
				persistanceService.set(constants.LOCAL_STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
			})
		);
	},
	{ functional: true, dispatch: false }
);

export const resetPasswordFailureEffect = createEffect(
	(
		actions$ = inject(Actions),
		authService = inject(AuthService),
		constants = inject(Constants),
		router = inject(Router),
		toastService = inject(ToastService)
	) => {
		return actions$.pipe(
			ofType(authActions.resetPasswordFailure),
			tap((error: any) => {
				// authService.handleResetSigninReCaptcha();

				toastService.enqueueToastNotification({
					message: error.error.message || error.message,
					type: constants.ALERT_TYPE.ERROR,
				});
			})
		);
	},
	{ functional: true, dispatch: false }
);

export const showBlockerEffect = createEffect(
	(actions$ = inject(Actions)) => {
		return actions$.pipe(
			ofType(authActions.signin, authActions.resetPassword),
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
				authActions.resetPasswordSuccess,
				authActions.resetPasswordFailure
			),
			exhaustMap(() => {
				return of(uiActions.hideBlocker());
			})
		);
	},
	{ functional: true }
);
