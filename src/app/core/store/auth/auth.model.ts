export interface ICurrentUser {
	id: string;
	accessToken: string;
	refreshToken: string;
	roles: string[];
}

export interface IAuthState {
	isLoading: boolean;
	greetingMessage: string;
	currentUser: ICurrentUser | null;
}
