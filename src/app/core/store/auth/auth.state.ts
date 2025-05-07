import { IAuthState } from '@coreModels/';

export const initialAuthState: IAuthState = {
	currentUser: null,
	forgotPasswordUi: {
		isEmailSent: false,
	},
};
