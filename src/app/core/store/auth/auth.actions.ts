import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const authActions = createActionGroup({
	source: 'Auth',
	events: {
		Signin: props<{ email: string; password: string; reCaptchaResponse: string }>(),
		'Signin Success': props<{ currentUser: any }>(),
		'Signin Failure': props<{ error: any }>(),
		Signout: emptyProps(),
	},
});
