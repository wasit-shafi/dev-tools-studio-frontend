import { Observable } from 'rxjs';

import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnDestroy, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { IAuthState, IForgotPasswordResponse, IResetPasswordResponse, ISigninResponse } from '@coreModels/';
import { PersistenceService } from '@coreServices/';
import { Constants } from '@coreShared/';
import { authFeature } from '@coreStore/';
import { environment } from '@environments/';
import { Store } from '@ngrx/store';

@Injectable({
	providedIn: 'root',
})
export class AuthService implements OnInit {
	private readonly constants = inject(Constants);
	private readonly http = inject(HttpClient);
	private readonly persistence = inject(PersistenceService);
	private readonly platformId = inject(PLATFORM_ID);
	private readonly store = inject(Store);

	private readonly isBrowser: WritableSignal<boolean> = signal(false);

	private authState!: IAuthState;

	public handleResetSigninReCaptcha!: () => void;

	constructor() {
		this.isBrowser.set(isPlatformBrowser(this.platformId));
		// added isBrowser check to make sure below code snippet don't run on server side (SSR)

		if (this.isBrowser()) {
			const accessToken = this.persistence.get(this.constants.LOCAL_STORAGE_KEYS.ACCESS_TOKEN);

			if (!!accessToken) {
				// refetch the user data from backend to populate the store
			}
		}
	}

	ngOnInit(): void {
		this.store.select(authFeature.selectAuthState).subscribe({
			next: (authState) => {
				this.authState = authState;
			},
		});
	}

	public handleRegisterCallbackOnSigninFailed(callback: () => void): void {
		this.handleResetSigninReCaptcha = callback;
	}

	public postSignin(data: any): Observable<ISigninResponse> {
		return this.http.post<ISigninResponse>(`${environment.baseUrl}${this.constants.API._V1}/auth/signin`, data);
	}

	public postForgotPassword(data: any): Observable<IForgotPasswordResponse> {
		return this.http.post<IForgotPasswordResponse>(
			`${environment.baseUrl}${this.constants.API._V1}/auth/forgot-password`,
			data
		);
	}

	public patchResetPassword(data: any): Observable<IResetPasswordResponse> {
		return this.http.patch<IResetPasswordResponse>(
			`${environment.baseUrl}${this.constants.API._V1}/auth/reset-password/${data.token}`,
			data
		);
	}
}
