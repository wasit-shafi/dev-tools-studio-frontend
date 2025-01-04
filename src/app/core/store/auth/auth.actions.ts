import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const authActions = createActionGroup({
	source: 'Auth',
	events: {
		// signin

		signin: props<{ email: string; password: string; reCaptchaResponse: string }>(),
		signinSuccess: props<{ currentUser: any }>(),
		signinFailure: props<{ message: string }>(),
		// signout

		signout: emptyProps(),
		// forgot password

		forgotPassword: props<{ email: string; reCaptchaResponse: string }>(),
		forgotPasswordSuccess: props<{ message: string }>(),
		forgotPasswordFailure: props<{ message: string }>(),
		// reset password

		resetPassword: props<{ password: string; confirmPassword: string; reCaptchaResponse: string; token: string }>(),
		resetPasswordSuccess: props<{ message: string }>(),
		resetPasswordFailure: props<{ message: string }>(),
	},
});
