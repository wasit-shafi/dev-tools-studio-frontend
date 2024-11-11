import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const authActions = createActionGroup({
	source: 'Auth',
	events: {
		Signin: props<{ email: string; password: string; reCaptchaResponse: string }>(),
		'Signin Success': props<{ currentUser: any }>(),
		'Signin Failure': props<{ error: any }>(),
		Signout: emptyProps(),
		'Reset Password': props<{ email: string; reCaptchaResponse: string }>(),
		'Reset Password Success': props<{ currentUser: any }>(),
		'Reset Password Failure': props<{ error: any }>(),
	},
});
