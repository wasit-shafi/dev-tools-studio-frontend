import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const authActions = createActionGroup({
	source: 'Auth',
	events: {
		signin: props<{ email: string; password: string; reCaptchaResponse: string }>(),
		signinSuccess: props<{ currentUser: any }>(),
		signinFailure: props<{ error: any }>(),
		Signout: emptyProps(),
		resetPassword: props<{ email: string; reCaptchaResponse: string }>(),
		resetPasswordSuccess: props<{ currentUser: any }>(),
		resetPasswordFailure: props<{ error: any }>(),
	},
});
