import { Observable } from 'rxjs';

import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnDestroy, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { ISigninResponse } from '@coreModels/auth.model';
import { PersistanceService } from '@coreServices/';
import { Constants } from '@coreShared/index';
import { IAuthState } from '@coreStore/auth/auth.model';
import { authFeature } from '@coreStore/index';
import { environment } from '@environments/';
import { Store } from '@ngrx/store';

interface IChangeAuthStatus {
	status: boolean;
	accessToken?: string;
	refreshToken?: string;
	roles?: number[];
}

@Injectable({
	providedIn: 'root',
})
export class AuthService implements OnInit, OnDestroy {
	private readonly constants = inject(Constants);
	private readonly http = inject(HttpClient);
	private readonly persistance = inject(PersistanceService);
	private readonly platformId = inject(PLATFORM_ID);
	private readonly store = inject(Store);

	private accessToken: string = '';
	private refreshToken: string = '';

	private isBrowser: WritableSignal<boolean> = signal(false);

	//Refer for more info:  https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API
	private readonly userBroadcastChannel = new BroadcastChannel(this.constants.BROADCAST_CHANNELS.USER.CHANNEL_NAME);

	private authState!: IAuthState;

	public handleResetSigninReCaptcha!: () => void;

	constructor() {
		this.isBrowser.set(isPlatformBrowser(this.platformId));
		// added isBrowser check to make sure below code snippet don't run on server side (SSR)

		if (this.isBrowser()) {
			const accessToken = localStorage?.getItem(this.constants.LOCAL_STORAGE_KEYS.ACCESS_TOKEN);

			// TODO: handle data fetch post page refresh

			// if (!!accessToken) {
			// 	this.isUserSignedIn.set(true);
			// }
		}

		this.userBroadcastChannel.onmessage = this.handleSignoutFromAllTabs.bind(this);
	}

	ngOnInit(): void {
		this.store.select(authFeature.selectAuthState).subscribe((authState) => {
			this.authState = authState;
		});
	}

	ngOnDestroy(): void {
		// Disconnect userBroadcastChannel channel
		this.userBroadcastChannel.close();
	}

	public handleRegisterCallbackOnSigninFailed(callback: () => void): void {
		this.handleResetSigninReCaptcha = callback;
	}

	public postSignin(data: any): Observable<ISigninResponse> {
		return this.http.post<ISigninResponse>(`${environment.baseUrl}${this.constants.API._V1}/auth/signin`, data);
	}

	public changeAuthStatus(params: IChangeAuthStatus) {
		const { status } = params;
		//TODO(wasit): review what to do if new and old status are same

		// if (this.isUserSignedIn() === params.status) {
		// 	return;
		// }

		if (status) {
			const { accessToken = '', refreshToken = '', roles = [] } = params;

			this.setAuthTokens = {
				accessToken: accessToken,
				refreshToken: refreshToken,
			};
		} else {
			// signout

			const data = {
				event: this.constants.BROADCAST_CHANNELS.USER.EVENTS.SIGNOUT,
				eventParams: {},
			};
			this.userBroadcastChannel.postMessage(data);
		}

		// this.isUserSignedIn.set(status);
	}

	public handleSignoutFromAllTabs(event: any) {
		const { data } = event;
		if (data.event == this.constants.BROADCAST_CHANNELS.USER.EVENTS.SIGNOUT) {
			// https://dev.to/demawo/how-to-logout-of-multiple-tabs-react-web-app-2egf
			// https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API
		}
	}

	// public get isAuthenticated(): boolean {
	// 	// return this.isUserSignedIn();
	// }

	// public isTokenExpired(): boolean {
	// 	return true;
	// }

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
		this.persistance.set(this.constants.LOCAL_STORAGE_KEYS.ACCESS_TOKEN, accessToken);
	}

	public set setRefreshToken(refreshToken: string) {
		this.refreshToken = refreshToken;
		this.persistance.set(this.constants.LOCAL_STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
	}

	public set setAuthTokens(tokens: any) {
		this.accessToken = tokens.accessToken;
		this.refreshToken = tokens.refreshToken;
		this.persistance.set(this.constants.LOCAL_STORAGE_KEYS.ACCESS_TOKEN, tokens.accessToken);
		this.persistance.set(this.constants.LOCAL_STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken);
	}

	public clearAuthTokens(): void {
		this.accessToken = '';
		this.refreshToken = '';
		this.persistance.remove(this.constants.LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
		this.persistance.remove(this.constants.LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
	}
}
