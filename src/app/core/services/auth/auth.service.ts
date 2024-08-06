import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private isUserLoggedIn: boolean = false;
	private accessToken!: string;
	private refreshToken!: string;

	public get getUserLoggedIn(): boolean {
		return this.isUserLoggedIn;
	}
	// TODO: review why setter function is causing problems here

	public setUserLoggedIn(loggedIn: any) {
		this.isUserLoggedIn = loggedIn;
	}

	public get getAccessToken(): string {
		return this.accessToken;
	}

	public get getRefreshToken(): string {
		return this.refreshToken;
	}

	public get getAuthTokens(): { accessToken: string; refreshToken: string } {
		return { accessToken: this.accessToken, refreshToken: this.refreshToken };
	}

	public set setAccessToken(accessToken: string) {
		this.accessToken = accessToken;
	}
	public set setRefreshToken(refreshToken: string) {
		this.refreshToken = refreshToken;
	}
	// TODO: review why setter function is causing problems here

	public setAuthTokens(tokens: { accessToken: string; refreshToken: string }) {
		this.accessToken = tokens.accessToken;
		this.refreshToken = tokens.refreshToken;
	}
}
