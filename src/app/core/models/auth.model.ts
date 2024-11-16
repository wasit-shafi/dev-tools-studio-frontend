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

export interface ICurrentUser {
	id: string;
	accessToken: string;
	refreshToken: string;
	roles: number[];
}

export interface IAuthState {
	isLoading: boolean;
	greetingMessage: string;
	currentUser: ICurrentUser | null;
}
