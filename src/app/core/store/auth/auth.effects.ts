import { catchError, exhaustMap, map, of, tap } from 'rxjs';

import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, PersistanceService, ToastService } from '@coreServices/';
import { Constants } from '@coreShared/';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { authActions } from './auth.actions';

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
						const data = { currentUser: response.data };
						return authActions.loginSuccess(data);
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
	(actions$ = inject(Actions), constants = inject(Constants), persistanceService = inject(PersistanceService)) => {
		return actions$.pipe(
			ofType(authActions.loginSuccess),
			tap((currentUser: any) => {
				const { authToken = '', refreshToken = '' } = currentUser;

				persistanceService.set(constants.LOCAL_STORAGE_KEYS.ACCESS_TOKEN, authToken);
				persistanceService.set(constants.LOCAL_STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
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
				router.navigate([constants.ROUTES.DASHBOARD]);
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

export const logoutEffect = createEffect(
	(
		actions$ = inject(Actions),
		router = inject(Router),
		constants = inject(Constants),
		persistanceService = inject(PersistanceService)
	) => {
		return actions$.pipe(
			ofType(authActions.logout),
			tap(() => {
				persistanceService.remove(constants.LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
				persistanceService.remove(constants.LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
				router.navigate([constants.ROUTES.ROOT]);
			})
		);
	},
	{ functional: true, dispatch: false }
);
