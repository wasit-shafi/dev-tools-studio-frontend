import { Injectable, Input } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private accessToken!: string;
	private refreshToken!: string;
	private isUserSignedIn: boolean = false;

	public get getUserSignedIn(): boolean {
		return this.isUserSignedIn;
	}

	public set setUserSignedIn(signedIn: any) {
		this.isUserSignedIn = signedIn;
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

	public set setAuthTokens(tokens: any) {
		// console.log('tokens :: ', tokens);
		this.accessToken = tokens.accessToken;
		this.refreshToken = tokens.refreshToken;
	}
}
