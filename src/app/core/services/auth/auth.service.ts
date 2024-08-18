import { Injectable, signal, WritableSignal } from '@angular/core';

interface IChangeAuthStatus {
	status: boolean;
	accessToken?: string;
	refreshToken?: string;
}

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private accessToken: string = '';
	private refreshToken: string = '';
	public isUserSignedIn: WritableSignal<boolean> = signal(false);

	constructor() {}

	public changeAuthStatus(params: IChangeAuthStatus) {
		const { status } = params;
		//TODO(wasit): review what to do if new and old status are same

		if (this.isUserSignedIn() === params.status) {
			return;
		}

		if (status) {
			const { accessToken = '', refreshToken = '' } = params;

			this.setAuthTokens = {
				accessToken: accessToken,
				refreshToken: refreshToken,
			};
		} else {
			this.clearAuthTokens();
		}

		this.isUserSignedIn.set(status);
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
		localStorage.setItem('accessToken', accessToken);
	}

	public set setRefreshToken(refreshToken: string) {
		this.refreshToken = refreshToken;
		localStorage.setItem('refreshToken', refreshToken);
	}

	public set setAuthTokens(tokens: any) {
		this.accessToken = tokens.accessToken;
		this.refreshToken = tokens.refreshToken;
		localStorage.setItem('accessToken', tokens.accessToken);
		localStorage.setItem('refreshToken', tokens.refreshToken);
	}

	public clearAuthTokens(): void {
		this.accessToken = '';
		this.refreshToken = '';
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
	}
}
