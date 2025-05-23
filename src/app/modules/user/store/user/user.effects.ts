import { catchError, exhaustMap, map, of, tap } from 'rxjs';

import { inject } from '@angular/core';
import { CustomHttpErrorResponse } from '@coreModels/';
import { ToastService } from '@coreServices/';
import { Constants } from '@coreShared/';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
	IAddAttachmentResponse,
	IDeleteAttachmentResponse,
	IDeleteCredentialResponse,
	IDeleteEmailTemplateResponse,
	IEditCredentialResponse,
	IEditEmailTemplateResponse,
	IGetAttachmentListResponse,
	IGetCredentialListResponse,
	IGetEmailTemplateListResponse,
	IPostCredentialResponse,
	IPostEmailTemplateResponse,
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
					catchError((errorResponse: CustomHttpErrorResponse) => {
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
					catchError((errorResponse: CustomHttpErrorResponse) => {
						return of(userActions.addCredentialFailure({ message: errorResponse.error.message }));
					})
				);
			})
		);
	},
	{ functional: true }
);

export const addCredentialSuccessEffect = createEffect(
	(actions$ = inject(Actions), toastService = inject(ToastService)) => {
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
					catchError((errorResponse: CustomHttpErrorResponse) => {
						return of(userActions.deleteCredentialFailure({ message: errorResponse.error.message }));
					})
				);
			})
		);
	},
	{ functional: true }
);

export const deleteCredentialSuccessEffect = createEffect(
	(actions$ = inject(Actions), toastService = inject(ToastService)) => {
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
					catchError((errorResponse: CustomHttpErrorResponse) => {
						return of(userActions.editCredentialFailure({ message: errorResponse.error.message }));
					})
				);
			})
		);
	},
	{ functional: true }
);

export const editCredentialSuccessEffect = createEffect(
	(actions$ = inject(Actions), toastService = inject(ToastService)) => {
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

export const getEmailTemplateListEffect = createEffect(
	(actions$ = inject(Actions), userService = inject(UserService)) => {
		return actions$.pipe(
			ofType(userActions.getEmailTemplateList),
			exhaustMap(() => {
				return userService.getEmailTemplateList().pipe(
					map((response: IGetEmailTemplateListResponse) => {
						return userActions.getEmailTemplateListSuccess({ emailTemplateList: response.data.emailTemplateList });
					}),
					catchError((errorResponse: CustomHttpErrorResponse) => {
						return of(userActions.getEmailTemplateListFailure({ message: errorResponse.error.message }));
					})
				);
			})
		);
	},
	{ functional: true }
);

export const getEmailTemplateListFailureEffect = createEffect(
	(actions$ = inject(Actions), constants = inject(Constants), toastService = inject(ToastService)) => {
		return actions$.pipe(
			ofType(userActions.getEmailTemplateListFailure),
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

export const deleteEmailTemplateEffect = createEffect(
	(actions$ = inject(Actions), userService = inject(UserService)) => {
		return actions$.pipe(
			ofType(userActions.deleteEmailTemplate),
			exhaustMap(({ _id }) => {
				return userService.deleteEmailTemplate(_id).pipe(
					map((response: IDeleteEmailTemplateResponse) => {
						return userActions.deleteEmailTemplateSuccess({ message: response.message });
					}),
					catchError((errorResponse: CustomHttpErrorResponse) => {
						return of(userActions.deleteEmailTemplateFailure({ message: errorResponse.error.message }));
					})
				);
			})
		);
	},
	{ functional: true }
);

export const deleteEmailTemplateSuccessEffect = createEffect(
	(actions$ = inject(Actions), constants = inject(Constants), toastService = inject(ToastService)) => {
		return actions$.pipe(
			ofType(userActions.deleteEmailTemplateSuccess),
			tap(({ message }) => {
				toastService.enqueueToastNotification({
					message,
				});
			}),
			// Dispatching getEmailTemplateList on success so that the state data & app UI gets auto updated

			map(userActions.getEmailTemplateList)
		);
	},
	{ functional: true }
);

export const deleteEmailTemplateFailureEffect = createEffect(
	(actions$ = inject(Actions), constants = inject(Constants), toastService = inject(ToastService)) => {
		return actions$.pipe(
			ofType(userActions.deleteEmailTemplateFailure),
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

export const addEmailTemplateEffect = createEffect(
	(actions$ = inject(Actions), userService = inject(UserService)) => {
		return actions$.pipe(
			ofType(userActions.addEmailTemplate),
			exhaustMap((addEmailTemplateData) => {
				return userService.postEmailTemplate(addEmailTemplateData).pipe(
					map((response: IPostEmailTemplateResponse) => {
						return userActions.addEmailTemplateSuccess({ message: response.message });
					}),
					catchError((errorResponse: CustomHttpErrorResponse) => {
						return of(userActions.addEmailTemplateFailure({ message: errorResponse.error.message }));
					})
				);
			})
		);
	},
	{ functional: true }
);

export const addEmailTemplateSuccessEffect = createEffect(
	(actions$ = inject(Actions), toastService = inject(ToastService)) => {
		return actions$.pipe(
			ofType(userActions.addEmailTemplateSuccess),
			tap(({ message }) => {
				toastService.enqueueToastNotification({
					message,
				});
			}),
			// Dispatching getEmailTemplateList on success so that the state data & app UI gets auto updated

			map(userActions.getEmailTemplateList)
		);
	},
	{ functional: true }
);

export const addEmailTemplateFailureEffect = createEffect(
	(actions$ = inject(Actions), constants = inject(Constants), toastService = inject(ToastService)) => {
		return actions$.pipe(
			ofType(userActions.addEmailTemplateFailure),
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

export const editEmailTemplateEffect = createEffect(
	(actions$ = inject(Actions), userService = inject(UserService)) => {
		return actions$.pipe(
			ofType(userActions.editEmailTemplate),
			exhaustMap(({ _id, data }) => {
				return userService.editEmailTemplate(_id, data).pipe(
					map((response: IEditEmailTemplateResponse) => {
						return userActions.editEmailTemplateSuccess({ message: response.message });
					}),
					catchError((errorResponse: CustomHttpErrorResponse) => {
						return of(userActions.editEmailTemplateFailure({ message: errorResponse.error.message }));
					})
				);
			})
		);
	},
	{ functional: true }
);

export const editEmailTemplateSuccessEffect = createEffect(
	(actions$ = inject(Actions), toastService = inject(ToastService)) => {
		return actions$.pipe(
			ofType(userActions.editEmailTemplateSuccess),
			tap(({ message }) => {
				toastService.enqueueToastNotification({
					message,
				});
			}),
			// Dispatching getEmailTemplateList on success so that the state data & app UI gets auto updated

			map(userActions.getEmailTemplateList)
		);
	},
	{ functional: true }
);

export const editEmailTemplateFailureEffect = createEffect(
	(actions$ = inject(Actions), constants = inject(Constants), toastService = inject(ToastService)) => {
		return actions$.pipe(
			ofType(userActions.editEmailTemplateFailure),
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

export const addAttachmentEffect = createEffect(
	(actions$ = inject(Actions), userService = inject(UserService)) => {
		return actions$.pipe(
			ofType(userActions.addAttachment),
			exhaustMap(({ formData }) => {
				return userService.postAttachment(formData).pipe(
					map((response: IAddAttachmentResponse) => {
						return userActions.addAttachmentSuccess({ message: response.message });
					}),
					catchError((errorResponse: CustomHttpErrorResponse) => {
						return of(userActions.addAttachmentFailure({ message: errorResponse.error.message }));
					})
				);
			})
		);
	},
	{ functional: true }
);

export const addAttachmentSuccessEffect = createEffect(
	(actions$ = inject(Actions), toastService = inject(ToastService)) => {
		return actions$.pipe(
			ofType(userActions.addAttachmentSuccess),
			tap(({ message }) => {
				toastService.enqueueToastNotification({
					message,
				});
			}),
			// Dispatching getAttachmentList on success so that the state data & app UI gets auto updated

			map(userActions.getAttachmentList)
		);
	},
	{ functional: true }
);

export const addAttachmentFailureEffect = createEffect(
	(actions$ = inject(Actions), constants = inject(Constants), toastService = inject(ToastService)) => {
		return actions$.pipe(
			ofType(userActions.addAttachmentFailure),
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

export const deleteAttachmentEffect = createEffect(
	(actions$ = inject(Actions), userService = inject(UserService)) => {
		return actions$.pipe(
			ofType(userActions.deleteAttachment),
			exhaustMap(({ _id }) => {
				return userService.deleteAttachment(_id).pipe(
					map((response: IDeleteAttachmentResponse) => {
						return userActions.deleteAttachmentSuccess({ message: response.message });
					}),
					catchError((errorResponse: CustomHttpErrorResponse) => {
						return of(userActions.deleteAttachmentFailure({ message: errorResponse.error.message }));
					})
				);
			})
		);
	},
	{ functional: true }
);

export const deleteAttachmentSuccessEffect = createEffect(
	(actions$ = inject(Actions), constants = inject(Constants), toastService = inject(ToastService)) => {
		return actions$.pipe(
			ofType(userActions.deleteAttachmentSuccess),
			tap(({ message }) => {
				toastService.enqueueToastNotification({
					message,
				});
			}),
			// Dispatching getAttachmentList on success so that the state data & app UI gets auto updated

			map(userActions.getAttachmentList)
		);
	},
	{ functional: true }
);

export const deleteAttachmentFailureEffect = createEffect(
	(actions$ = inject(Actions), constants = inject(Constants), toastService = inject(ToastService)) => {
		return actions$.pipe(
			ofType(userActions.deleteAttachmentFailure),
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

export const getAttachmentListEffect = createEffect(
	(actions$ = inject(Actions), userService = inject(UserService)) => {
		return actions$.pipe(
			ofType(userActions.getAttachmentList),
			exhaustMap(() => {
				return userService.getAttachmentList().pipe(
					map((response: IGetAttachmentListResponse) => {
						return userActions.getAttachmentListSuccess({ attachmentList: response.data.attachmentList });
					}),
					catchError((errorResponse: CustomHttpErrorResponse) => {
						return of(userActions.getAttachmentListFailure({ message: errorResponse.error.message }));
					})
				);
			})
		);
	},
	{ functional: true }
);

export const getAttachmentListFailureEffect = createEffect(
	(actions$ = inject(Actions), constants = inject(Constants), toastService = inject(ToastService)) => {
		return actions$.pipe(
			ofType(userActions.getAttachmentListFailure),
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
