import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal, WritableSignal, OnDestroy } from '@angular/core';

import { Constants } from '@coreShared/index';
import { PersistanceService } from '@coreServices/';

interface IChangeAuthStatus {
	status: boolean;
	accessToken?: string;
	refreshToken?: string;
	roles?: number[];
}

@Injectable({
	providedIn: 'root',
})
export class AuthService implements OnDestroy {
	private accessToken: string = '';
	private refreshToken: string = '';

	public roles: WritableSignal<number[]> = signal([]);
	private isUserSignedIn: WritableSignal<boolean> = signal(false);
	private isBrowser: WritableSignal<boolean> = signal(false);

	private readonly constants = inject(Constants);
	private readonly persistance = inject(PersistanceService);
	private readonly platformId = inject(PLATFORM_ID);

	//Refer for more info:  https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API
	private readonly userBroadcastChannel = new BroadcastChannel(this.constants.BROADCAST_CHANNELS.USER.CHANNEL_NAME);

	constructor() {
		this.isBrowser.set(isPlatformBrowser(this.platformId));
		// added isBrowser check to make sure below code snippet don't run on server side (SSR)

		if (this.isBrowser()) {
			const accessToken = localStorage?.getItem(this.constants.JWT.ACCESS_TOKEN);

			if (!!accessToken) {
				this.isUserSignedIn.set(true);
			}
		}

		this.userBroadcastChannel.onmessage = this.handleLogoutFromAllTabs.bind(this);
	}

	ngOnDestroy(): void {
		// Disconnect userBroadcastChannel channel
		this.userBroadcastChannel.close();
	}

	public hasRole(role: number): boolean {
		return this.roles().includes(role);
	}

	public changeAuthStatus(params: IChangeAuthStatus) {
		const { status } = params;
		//TODO(wasit): review what to do if new and old status are same

		if (this.isUserSignedIn() === params.status) {
			return;
		}

		if (status) {
			const { accessToken = '', refreshToken = '', roles = [] } = params;

			this.setAuthTokens = {
				accessToken: accessToken,
				refreshToken: refreshToken,
			};
			this.roles.set(roles);
		} else {
			// logout

			const data = {
				event: this.constants.BROADCAST_CHANNELS.USER.EVENTS.LOGOUT,
				eventParams: {},
			};
			this.userBroadcastChannel.postMessage(data);
		}

		this.isUserSignedIn.set(status);
	}

	public handleLogoutFromAllTabs(event: any) {
		const { data } = event;
		if (data.event == this.constants.BROADCAST_CHANNELS.USER.EVENTS.LOGOUT) {
			this.clearAuthTokens();
			this.clearRoles();
			window.location.reload();
		}
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
		this.persistance.set(this.constants.JWT.ACCESS_TOKEN, accessToken);
	}

	public set setRefreshToken(refreshToken: string) {
		this.refreshToken = refreshToken;
		this.persistance.set(this.constants.JWT.REFRESH_TOKEN, refreshToken);
	}

	public set setAuthTokens(tokens: any) {
		this.accessToken = tokens.accessToken;
		this.refreshToken = tokens.refreshToken;
		this.persistance.set(this.constants.JWT.ACCESS_TOKEN, tokens.accessToken);
		this.persistance.set(this.constants.JWT.REFRESH_TOKEN, tokens.refreshToken);
	}

	public clearAuthTokens(): void {
		this.accessToken = '';
		this.refreshToken = '';
		this.persistance.remove(this.constants.JWT.ACCESS_TOKEN);
		this.persistance.remove(this.constants.JWT.REFRESH_TOKEN);
	}

	public clearRoles(): void {
		this.roles.set([]);
	}
}
