import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private accessToken!: string;
	private refreshToken!: string;
	public isUserSignedIn: WritableSignal<boolean> = signal(false);

	public changeAuthStatus(status: boolean): void {}

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
		this.accessToken = tokens.accessToken;
		this.refreshToken = tokens.refreshToken;
	}
}
