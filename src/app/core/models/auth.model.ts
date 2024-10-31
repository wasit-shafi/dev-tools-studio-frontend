interface ISigninData {
	id: string;
	accessToken: string;
	refreshToken: string;
	roles: number[];
}

interface ISigninResponse {
	code: number;
	data: ISigninData;
	message: string;
	success: boolean;
}

export { ISigninResponse };
