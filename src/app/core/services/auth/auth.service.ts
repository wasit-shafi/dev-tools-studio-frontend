import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { Constants } from '@coreShared/index';

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
	private isUserSignedIn: WritableSignal<boolean> = signal(false);
	private isBrowser: WritableSignal<boolean> = signal(false);
	// TODO: create a new service may bu util/app/config service save the platform id, user device info, browser, location info etc

	private constants = inject(Constants);
	private platformId = inject(PLATFORM_ID);

	constructor() {
		// TODO: Create a localStorage/cookieService to handle io operations

		this.isBrowser.set(isPlatformBrowser(this.platformId));
		// added isBrowser check to make sure below code snippet don't run on server side (SSR)

		if (this.isBrowser()) {
			const accessToken = localStorage?.getItem(this.constants.JWT.ACCESS_TOKEN);

			if (!!accessToken) {
				this.isUserSignedIn.set(true);
			}
		}
	}

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

	public get isAuthenticated(): boolean {
		return this.isUserSignedIn();
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
		localStorage.setItem(this.constants.JWT.ACCESS_TOKEN, accessToken);
	}

	public set setRefreshToken(refreshToken: string) {
		this.refreshToken = refreshToken;
		localStorage.setItem(this.constants.JWT.REFRESH_TOKEN, refreshToken);
	}

	public set setAuthTokens(tokens: any) {
		this.accessToken = tokens.accessToken;
		this.refreshToken = tokens.refreshToken;
		localStorage.setItem(this.constants.JWT.ACCESS_TOKEN, tokens.accessToken);
		localStorage.setItem(this.constants.JWT.REFRESH_TOKEN, tokens.refreshToken);
	}

	public clearAuthTokens(): void {
		this.accessToken = '';
		this.refreshToken = '';
		localStorage.removeItem(this.constants.JWT.ACCESS_TOKEN);
		localStorage.removeItem(this.constants.JWT.REFRESH_TOKEN);
	}
}
