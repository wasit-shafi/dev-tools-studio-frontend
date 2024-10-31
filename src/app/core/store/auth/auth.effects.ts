import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { authActions } from './auth.actions';
import { AuthService, ToastService } from '@coreServices/';

import { Constants } from '@coreShared/';
import { HttpErrorResponse } from '@angular/common/http';

export const signinEffect = createEffect(
	(
		actions$ = inject(Actions),
		router = inject(Router),
		constants = inject(Constants),
		authService = inject(AuthService)
	) => {
		return actions$.pipe(
			ofType(authActions.login),
			exhaustMap(({ email, password, reCaptchaResponse }) => {
				return authService.postSignin({ email, password, reCaptchaResponse }).pipe(
					map((response: any) => {
						return authActions.loginSuccess(response);
					}),
					catchError((errorResponse: HttpErrorResponse) => {
						return of(authActions.loginFailure(errorResponse));
					})
				);
			})
		);
	},
	{ functional: true }
);

export const loginSuccessEffect = createEffect(
	(
		actions$ = inject(Actions),
		router = inject(Router),
		constants = inject(Constants),
		authService = inject(AuthService)
	) => {
		return actions$.pipe(
			ofType(authActions.loginSuccess),
			tap((response: any) => {
				authService.changeAuthStatus({
					status: true,
					accessToken: response.data.accessToken,
					refreshToken: response.data.refreshToken,
					roles: response.data.roles,
				});
				router.navigate([constants.ROUTES.SIGNUP]);
			})
		);
	},
	{ functional: true, dispatch: false }
);

export const redirectAfterLoginEffect = createEffect(
	(actions$ = inject(Actions), router = inject(Router), constants = inject(Constants)) => {
		return actions$.pipe(
			ofType(authActions.loginSuccess),
			tap(() => {
				router.navigate([constants.ROUTES.SIGNUP]);
			})
		);
	},
	{ functional: true, dispatch: false }
);

export const loginFailureEffect = createEffect(
	(
		actions$ = inject(Actions),
		router = inject(Router),
		constants = inject(Constants),
		toastService = inject(ToastService)
	) => {
		return actions$.pipe(
			ofType(authActions.loginFailure),
			tap((error: any) => {
				toastService.enqueueToastNotification({
					message: error.error.message || error.message,
					type: constants.ALERT_TYPE.ERROR,
				});
			})
		);
	},
	{ functional: true, dispatch: false }
);
