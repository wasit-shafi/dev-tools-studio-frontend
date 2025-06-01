import { ISignupData, IUser } from '@coreModels/';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IAddProfilePicture } from '@userModels/';

export const authActions = createActionGroup({
	source: 'Auth',
	events: {
		// signin

		signin: props<{ email: string; password: string; reCaptcha: string }>(),
		signinSuccess: props<{ currentUser: IUser }>(),
		signinFailure: props<{ message: string }>(),
		// signup

		signup: props<ISignupData>(),
		signupSuccess: props<{ message: string }>(),
		signupFailure: props<{ message: string }>(),

		// auto signin (using access/refresh token)

		autoSigninSuccess: props<{ currentUser: IUser }>(),
		// signout

		signout: emptyProps(),
		signoutSuccess: props<{ message: string }>(),
		signoutFailure: props<{ message: string }>(),
		// forgot password

		forgotPassword: props<{ email: string; reCaptcha: string }>(),
		forgotPasswordSuccess: props<{ message: string }>(),
		forgotPasswordFailure: props<{ message: string }>(),
		// reset password

		resetPassword: props<{ password: string; confirmPassword: string; reCaptcha: string; token: string }>(),
		resetPasswordSuccess: props<{ message: string }>(),
		resetPasswordFailure: props<{ message: string }>(),
		// add profile

		profilePicture: props<IAddProfilePicture>(),
		profilePictureSuccess: props<{ message: string; profilePicture: string }>(),
		profilePictureFailure: props<{ message: string }>(),
	},
});
