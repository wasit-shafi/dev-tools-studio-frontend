import { IAuthState } from '@coreModels/';

export const initialAuthState: IAuthState = {
	isLoading: false,
	currentUser: null,
	forgotPasswordUi: {
		isEmailSent: false,
	},
};
