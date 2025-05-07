export interface IUser {
	_id: string;
	accessToken: string;
	country: string;
	countryCode: string;
	createdAt: Date;
	displayName: string;
	email: string;
	firstName: string;
	isEmailVerified: boolean;
	isMobileNumberVerified: boolean;
	lastName: string;
	mobileNumber: string;
	refreshToken: string;
	roles: number[];
	userName: string;
}

export interface IPostSigninData {
	user: IUser;
}
export interface ISigninResponse {
	code: number;
	data: IPostSigninData;
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

export interface IForgotPasswordUi {
	isEmailSent: boolean;
}

export interface IAuthState {
	currentUser: IUser | null;
	forgotPasswordUi: IForgotPasswordUi | null;
}
