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

@Injectable({
	providedIn: 'root',
})
export class AuthService implements OnInit, OnDestroy {
	private readonly constants = inject(Constants);
	private readonly http = inject(HttpClient);
	private readonly persistance = inject(PersistanceService);
	private readonly platformId = inject(PLATFORM_ID);
	private readonly store = inject(Store);

	private isBrowser: WritableSignal<boolean> = signal(false);

	//Refer for more info:  https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API
	private readonly userBroadcastChannel = new BroadcastChannel(this.constants.BROADCAST_CHANNELS.USER.CHANNEL_NAME);

	private authState!: IAuthState;

	public handleResetSigninReCaptcha!: () => void;

	constructor() {
		this.isBrowser.set(isPlatformBrowser(this.platformId));
		// added isBrowser check to make sure below code snippet don't run on server side (SSR)

		if (this.isBrowser()) {
			const accessToken = this.persistance.get(this.constants.LOCAL_STORAGE_KEYS.ACCESS_TOKEN);

			if (!!accessToken) {
				// refetch the user data from backend to populate the store
			}
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

	public handleSignoutFromAllTabs(event: any) {
		const { data } = event;
		if (data.event == this.constants.BROADCAST_CHANNELS.USER.EVENTS.SIGNOUT) {
			// https://dev.to/demawo/how-to-logout-of-multiple-tabs-react-web-app-2egf
			// https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API
		}
	}
}
