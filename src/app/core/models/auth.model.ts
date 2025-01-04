interface ISigninData {
	id: string;
	accessToken: string;
	refreshToken: string;
	roles: number[];
}

export interface ISigninResponse {
	code: number;
	data: ISigninData;
	message: string;
	success: boolean;
}

export interface IForgotPasswordResponse {
	code: number;
	data: null;
	message: string;
	success: boolean;
}

export interface IResetPasswordResponse {
	code: number;
	data: null;
	message: string;
	success: boolean;
}

export interface ICurrentUser {
	id: string;
	accessToken: string;
	refreshToken: string;
	roles: number[];
}

export interface IForgotPasswordUi {
	isEmailSent: boolean;
}

export interface IAuthState {
	isLoading: boolean;
	currentUser: ICurrentUser | null;
	forgotPasswordUi: IForgotPasswordUi | null;
}
