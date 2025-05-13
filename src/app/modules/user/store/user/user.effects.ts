import { catchError, exhaustMap, map, of, tap } from 'rxjs';

import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastService } from '@coreServices/';
import { Constants } from '@coreShared/';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    IDeleteCredentialResponse, IEditCredentialResponse, IGetCredentialListResponse, IPostCredentialResponse
} from '@userModels/';
import { UserService } from '@userServices/';

import { userActions } from './user.actions';

export const getCredentialListEffect = createEffect(
	(actions$ = inject(Actions), userService = inject(UserService)) => {
		return actions$.pipe(
			ofType(userActions.getCredentialList),
			exhaustMap(() => {
				return userService.getCredentialList().pipe(
					map((response: IGetCredentialListResponse) => {
						return userActions.getCredentialListSuccess({ credentialList: response.data.credentialList });
					}),
					catchError((errorResponse: HttpErrorResponse) => {
						return of(userActions.getCredentialListFailure({ message: errorResponse.error.message }));
					})
				);
			})
		);
	},
	{ functional: true }
);

export const getCredentialListFailureEffect = createEffect(
	(actions$ = inject(Actions), constants = inject(Constants), toastService = inject(ToastService)) => {
		return actions$.pipe(
			ofType(userActions.getCredentialListFailure),
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

export const addCredentialEffect = createEffect(
	(actions$ = inject(Actions), userService = inject(UserService)) => {
		return actions$.pipe(
			ofType(userActions.addCredential),
			exhaustMap((addCredentialData) => {
				return userService.postCredential(addCredentialData).pipe(
					map((response: IPostCredentialResponse) => {
						return userActions.addCredentialSuccess({ message: response.message });
					}),
					catchError((errorResponse: HttpErrorResponse) => {
						return of(userActions.addCredentialFailure({ message: errorResponse.error.message }));
					})
				);
			})
		);
	},
	{ functional: true }
);

export const addCredentialSuccessEffect = createEffect(
	(actions$ = inject(Actions), constants = inject(Constants), toastService = inject(ToastService)) => {
		return actions$.pipe(
			ofType(userActions.addCredentialSuccess),
			tap(({ message }) => {
				toastService.enqueueToastNotification({
					message,
				});
			}),
			// Dispatching getCredentialList on success so that the state data & app UI gets auto updated

			map(userActions.getCredentialList)
		);
	},
	{ functional: true }
);

export const addCredentialFailureEffect = createEffect(
	(actions$ = inject(Actions), constants = inject(Constants), toastService = inject(ToastService)) => {
		return actions$.pipe(
			ofType(userActions.addCredentialFailure),
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

export const deleteCredentialEffect = createEffect(
	(actions$ = inject(Actions), userService = inject(UserService)) => {
		return actions$.pipe(
			ofType(userActions.deleteCredential),
			exhaustMap(({ _id }) => {
				return userService.deleteCredential(_id).pipe(
					map((response: IDeleteCredentialResponse) => {
						return userActions.deleteCredentialSuccess({ message: response.message });
					}),
					catchError((errorResponse: HttpErrorResponse) => {
						return of(userActions.deleteCredentialFailure({ message: errorResponse.error.message }));
					})
				);
			})
		);
	},
	{ functional: true }
);

export const deleteCredentialSuccessEffect = createEffect(
	(actions$ = inject(Actions), constants = inject(Constants), toastService = inject(ToastService)) => {
		return actions$.pipe(
			ofType(userActions.deleteCredentialSuccess),
			tap(({ message }) => {
				toastService.enqueueToastNotification({
					message,
				});
			}),
			// Dispatching getCredentialList on success so that the state data & app UI gets auto updated
			map(userActions.getCredentialList)
		);
	},
	{ functional: true }
);

export const deleteCredentialFailureEffect = createEffect(
	(actions$ = inject(Actions), constants = inject(Constants), toastService = inject(ToastService)) => {
		return actions$.pipe(
			ofType(userActions.deleteCredentialFailure),
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

export const editCredentialEffect = createEffect(
	(actions$ = inject(Actions), userService = inject(UserService)) => {
		return actions$.pipe(
			ofType(userActions.editCredential),
			exhaustMap(({ _id, data }) => {
				return userService.editCredential(_id, data).pipe(
					map((response: IEditCredentialResponse) => {
						return userActions.editCredentialSuccess({ message: response.message });
					}),
					catchError((errorResponse: HttpErrorResponse) => {
						return of(userActions.editCredentialFailure({ message: errorResponse.error.message }));
					})
				);
			})
		);
	},
	{ functional: true }
);

export const editCredentialSuccessEffect = createEffect(
	(actions$ = inject(Actions), constants = inject(Constants), toastService = inject(ToastService)) => {
		return actions$.pipe(
			ofType(userActions.editCredentialSuccess),
			tap(({ message }) => {
				toastService.enqueueToastNotification({
					message,
				});
			}),
			// Dispatching getCredentialList on success so that the state data & app UI gets auto updated
			map(userActions.getCredentialList)
		);
	},
	{ functional: true }
);

export const editCredentialFailureEffect = createEffect(
	(actions$ = inject(Actions), constants = inject(Constants), toastService = inject(ToastService)) => {
		return actions$.pipe(
			ofType(userActions.editCredentialFailure),
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
