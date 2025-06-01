import { catchError, exhaustMap, map, of, tap } from 'rxjs';

import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CustomHttpErrorResponse } from '@coreModels/';
import { AuthService, PersistenceService, ToastService } from '@coreServices/';
import { Constants } from '@coreShared/';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { authActions } from './auth.actions';

// signin

export const signinEffect = createEffect(
	(actions$ = inject(Actions), authService = inject(AuthService)) => {
		return actions$.pipe(
			ofType(authActions.signin),
			exhaustMap(({ email, password, reCaptcha }) => {
				return authService.postSignin({ email, password, reCaptcha }).pipe(
					map((response: any) => {
						const data = { currentUser: response.data.user };
						return authActions.signinSuccess(data);
					}),
					catchError((errorResponse: CustomHttpErrorResponse) => {
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
			tap((data: any) => {
				const { currentUser: { accessToken = '', refreshToken = '' } = {} } = data;

				persistenceService.set(constants.LOCAL_STORAGE_KEYS.ACCESS_TOKEN, accessToken);
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
// Signup

export const signupEffect = createEffect(
	(actions$ = inject(Actions), authService = inject(AuthService)) => {
		return actions$.pipe(
			ofType(authActions.signup),
			exhaustMap((data) => {
				return authService.postSignup(data).pipe(
					map(({ message }) => {
						return authActions.signupSuccess({ message });
					}),
					catchError((errorResponse: CustomHttpErrorResponse) => {
						return of(authActions.signupFailure({ message: errorResponse.error.message }));
					})
				);
			})
		);
	},
	{ functional: true }
);

export const signupSuccessEffect = createEffect(
	(actions$ = inject(Actions), toastService = inject(ToastService)) => {
		return actions$.pipe(
			ofType(authActions.signupSuccess),
			tap(({ message }) => {
				toastService.enqueueToastNotification({
					message,
				});
			})
		);
	},
	{ functional: true, dispatch: false }
);

export const redirectAfterSignupEffect = createEffect(
	(constants = inject(Constants), actions$ = inject(Actions), router = inject(Router)) => {
		return actions$.pipe(
			ofType(authActions.signupSuccess),
			tap(() => {
				router.navigate([constants.ROUTES.SIGNIN]);
			})
		);
	},
	{ functional: true, dispatch: false }
);

export const signupFailureEffect = createEffect(
	(
		actions$ = inject(Actions),
		authService = inject(AuthService),
		constants = inject(Constants),
		toastService = inject(ToastService)
	) => {
		return actions$.pipe(
			ofType(authActions.signupFailure),
			tap(({ message }) => {
				authService.handleResetSignupReCaptcha();

				toastService.enqueueToastNotification({
					message,
					type: constants.ALERT_TYPE.ERROR,
				});
			})
		);
	},
	{ functional: true, dispatch: false }
);

// Auto Signin

export const autoSigninSuccessEffect = createEffect(
	(actions$ = inject(Actions), persistenceService = inject(PersistenceService), constants = inject(Constants)) => {
		return actions$.pipe(
			ofType(authActions.autoSigninSuccess),
			tap(({ currentUser }) => {
				const { accessToken = '', refreshToken = '' } = currentUser;
				// NOTE:  '*/auth/refresh' endpoint return the existing accessToken only while the '*/auth/me' returns both the newly created accessToken as well as refreshToken

				if (accessToken) {
					persistenceService.set(constants.LOCAL_STORAGE_KEYS.ACCESS_TOKEN, accessToken);
				}

				if (refreshToken) {
					persistenceService.set(constants.LOCAL_STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
				}
			})
		);
	},
	{ functional: true, dispatch: false }
);

// signout

export const signoutEffect = createEffect(
	(actions$ = inject(Actions), authService = inject(AuthService)) => {
		return actions$.pipe(
			ofType(authActions.signout),
			exhaustMap(() => {
				return authService.postSignout().pipe(
					map((response: any) => {
						return authActions.signoutSuccess({ message: response.message });
					}),
					catchError((errorResponse: CustomHttpErrorResponse) => {
						return of(authActions.signoutFailure({ message: errorResponse.error.message }));
					})
				);
			})
		);
	},
	{ functional: true }
);

export const signoutSuccessEffect = createEffect(
	(
		actions$ = inject(Actions),
		constants = inject(Constants),
		persistenceService = inject(PersistenceService),
		router = inject(Router),
		toastService = inject(ToastService)
	) => {
		return actions$.pipe(
			ofType(authActions.signoutSuccess),
			tap((data) => {
				persistenceService.remove(constants.LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
				persistenceService.remove(constants.LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
				router.navigate([constants.ROUTES.ROOT]);
				toastService.enqueueToastNotification({
					message: data.message,
				});
			})
		);
	},
	{ functional: true, dispatch: false }
);

export const signoutFailureEffect = createEffect(
	(actions$ = inject(Actions), constants = inject(Constants), toastService = inject(ToastService)) => {
		return actions$.pipe(
			ofType(authActions.signoutFailure),
			tap((data) => {
				toastService.enqueueToastNotification({
					message: data.message,
					type: constants.ALERT_TYPE.ERROR,
				});
			})
		);
	},
	{ functional: true, dispatch: false }
);
// forgotPassword

export const forgotPasswordEffect = createEffect(
	(actions$ = inject(Actions), authService = inject(AuthService)) => {
		return actions$.pipe(
			ofType(authActions.forgotPassword),
			exhaustMap(({ email, reCaptcha }) => {
				return authService.postForgotPassword({ email, reCaptcha }).pipe(
					map((response) => {
						return authActions.forgotPasswordSuccess({ message: response.message });
					}),
					catchError((errorResponse: CustomHttpErrorResponse) => {
						return of(authActions.forgotPasswordFailure({ message: errorResponse.error.message }));
					})
				);
			})
		);
	},
	{ functional: true }
);

export const forgotPasswordSuccessEffect = createEffect(
	(actions$ = inject(Actions), toastService = inject(ToastService)) => {
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
	(actions$ = inject(Actions), constants = inject(Constants), toastService = inject(ToastService)) => {
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
	(actions$ = inject(Actions), authService = inject(AuthService)) => {
		return actions$.pipe(
			ofType(authActions.resetPassword),
			exhaustMap(({ password, confirmPassword, reCaptcha, token }) => {
				return authService.patchResetPassword({ password, confirmPassword, reCaptcha, token }).pipe(
					map((response) => {
						return authActions.resetPasswordSuccess({ message: response.message });
					}),
					catchError((errorResponse: CustomHttpErrorResponse) => {
						return of(authActions.resetPasswordFailure({ message: errorResponse.error.message }));
					})
				);
			})
		);
	},
	{ functional: true }
);

export const resetPasswordSuccessEffect = createEffect(
	(actions$ = inject(Actions), toastService = inject(ToastService)) => {
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
	(actions$ = inject(Actions), constants = inject(Constants), toastService = inject(ToastService)) => {
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
// Profile Picture

export const profilePictureEffect = createEffect(
	(actions$ = inject(Actions), authService = inject(AuthService)) => {
		return actions$.pipe(
			ofType(authActions.profilePicture),
			exhaustMap(({ formData }) => {
				return authService.postProfilePicture(formData).pipe(
					map((response) => {
						return authActions.profilePictureSuccess({
							message: response.message,
							profilePicture: response.data.profilePicture,
						});
					}),
					catchError((errorResponse: CustomHttpErrorResponse) => {
						return of(authActions.profilePictureFailure({ message: errorResponse.error.message }));
					})
				);
			})
		);
	},
	{ functional: true }
);

export const profilePictureSuccessEffect = createEffect(
	(actions$ = inject(Actions), toastService = inject(ToastService)) => {
		return actions$.pipe(
			ofType(authActions.profilePictureSuccess),
			tap(({ message }) => {
				toastService.enqueueToastNotification({
					message,
				});
			})
		);
	},
	{ functional: true, dispatch: false }
);

export const profilePictureFailureEffect = createEffect(
	(actions$ = inject(Actions), constants = inject(Constants), toastService = inject(ToastService)) => {
		return actions$.pipe(
			ofType(authActions.profilePictureFailure),
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
