import { IApiBaseResponse } from '@coreModels/';

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
export interface ISigninResponse extends IApiBaseResponse {
	data: IPostSigninData;
}

export interface IForgotPasswordResponse extends IApiBaseResponse {
	data: null;
}

export interface IResetPasswordResponse extends IApiBaseResponse {
	data: null;
}

export interface IForgotPasswordUi {
	isEmailSent: boolean;
}

export interface IAuthState {
	currentUser: IUser | null;
	forgotPasswordUi: IForgotPasswordUi | null;
}
