import { catchError, exhaustMap, map, of, tap } from 'rxjs';

import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, PersistenceService, ToastService } from '@coreServices/';
import { Constants } from '@coreShared/';
import { uiActions } from '@coreStore/';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { authActions } from './auth.actions';

// signin

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
						return of(authActions.signinFailure({ message: errorResponse.error.message }));
					})
				);
			})
		);
	},
	{ functional: true }
);

export const signinSuccessEffect = createEffect(
	(actions$ = inject(Actions), persistenceService = inject(PersistenceService), constants = inject(Constants)) => {
		return actions$.pipe(
			ofType(authActions.signinSuccess),
			tap((currentUser: any) => {
				const { authToken = '', refreshToken = '' } = currentUser;

				persistenceService.set(constants.LOCAL_STORAGE_KEYS.ACCESS_TOKEN, authToken);
				persistenceService.set(constants.LOCAL_STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
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
			tap((error) => {
				authService.handleResetSigninReCaptcha();

				toastService.enqueueToastNotification({
					message: error.message,
					type: constants.ALERT_TYPE.ERROR,
				});
			})
		);
	},
	{ functional: true, dispatch: false }
);
// signout

export const signoutEffect = createEffect(
	(
		actions$ = inject(Actions),
		constants = inject(Constants),
		persistenceService = inject(PersistenceService),
		router = inject(Router)
	) => {
		return actions$.pipe(
			ofType(authActions.signout),
			tap(() => {
				persistenceService.remove(constants.LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
				persistenceService.remove(constants.LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
				router.navigate([constants.ROUTES.ROOT]);
			})
		);
	},
	{ functional: true, dispatch: false }
);
// forgotPassword

export const forgotPasswordEffect = createEffect(
	(
		actions$ = inject(Actions),
		authService = inject(AuthService),
		constants = inject(Constants),
		router = inject(Router)
	) => {
		return actions$.pipe(
			ofType(authActions.forgotPassword),
			exhaustMap(({ email, reCaptchaResponse }) => {
				return authService.postForgotPassword({ email, reCaptchaResponse }).pipe(
					map((response) => {
						return authActions.forgotPasswordSuccess({ message: response.message });
					}),
					catchError((errorResponse: HttpErrorResponse) => {
						return of(authActions.forgotPasswordFailure({ message: errorResponse.error.message }));
					})
				);
			})
		);
	},
	{ functional: true }
);

export const forgotPasswordSuccessEffect = createEffect(
	(actions$ = inject(Actions), constants = inject(Constants), toastService = inject(ToastService)) => {
		return actions$.pipe(
			ofType(authActions.forgotPasswordSuccess),
			tap((response: any) => {
				toastService.enqueueToastNotification({
					message: response.message,
				});
			})
		);
	},
	{ functional: true, dispatch: false }
);

export const forgotPasswordFailureEffect = createEffect(
	(
		actions$ = inject(Actions),
		authService = inject(AuthService),
		constants = inject(Constants),
		router = inject(Router),
		toastService = inject(ToastService)
	) => {
		return actions$.pipe(
			ofType(authActions.forgotPasswordFailure),
			tap((error) => {
				toastService.enqueueToastNotification({
					message: error.message,
					type: constants.ALERT_TYPE.ERROR,
				});
			})
		);
	},
	{ functional: true, dispatch: false }
);

// resetPassword

export const resetPasswordEffect = createEffect(
	(
		actions$ = inject(Actions),
		authService = inject(AuthService),
		constants = inject(Constants),
		router = inject(Router)
	) => {
		return actions$.pipe(
			ofType(authActions.resetPassword),
			exhaustMap(({ password, confirmPassword, reCaptchaResponse, token }) => {
				return authService.patchResetPassword({ password, confirmPassword, reCaptchaResponse, token }).pipe(
					map((response) => {
						return authActions.resetPasswordSuccess({ message: response.message });
					}),
					catchError((errorResponse: HttpErrorResponse) => {
						return of(authActions.resetPasswordFailure({ message: errorResponse.error.message }));
					})
				);
			})
		);
	},
	{ functional: true }
);

export const resetPasswordSuccessEffect = createEffect(
	(actions$ = inject(Actions), constants = inject(Constants), toastService = inject(ToastService)) => {
		return actions$.pipe(
			ofType(authActions.resetPasswordSuccess),
			tap((response) => {
				toastService.enqueueToastNotification({
					message: response.message,
				});
			})
		);
	},
	{ functional: true, dispatch: false }
);

export const redirectAfterResetPasswordSuccessEffect = createEffect(
	(constants = inject(Constants), actions$ = inject(Actions), router = inject(Router)) => {
		return actions$.pipe(
			ofType(authActions.resetPasswordSuccess),

			tap(() => {
				router.navigate([constants.ROUTES.SIGNIN]);
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
			tap((error) => {
				toastService.enqueueToastNotification({
					message: error.message,
					type: constants.ALERT_TYPE.ERROR,
				});
			})
		);
	},
	{ functional: true, dispatch: false }
);
// ui blocker

export const showBlockerEffect = createEffect(
	(actions$ = inject(Actions)) => {
		return actions$.pipe(
			ofType(authActions.signin, authActions.forgotPassword, authActions.resetPassword),
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

				authActions.forgotPasswordSuccess,
				authActions.forgotPasswordFailure,

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
