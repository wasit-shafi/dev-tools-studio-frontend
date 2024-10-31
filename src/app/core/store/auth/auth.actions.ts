import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const authActions = createActionGroup({
	source: 'Auth',
	events: {
		Login: props<{ email: string; password: string; reCaptchaResponse: string }>(),
		'Login Success': props<{ response: any }>(),
		'Login Failure': props<{ error: any }>(),
		Logout: emptyProps(),
	},
});
