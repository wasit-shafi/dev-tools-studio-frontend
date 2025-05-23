import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { IAuthState, IForgotPasswordResponse, IResetPasswordResponse, ISigninResponse } from '@coreModels/';
import { PersistenceService } from '@coreServices/';
import { AppService } from '@coreServices/app/app.service';
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
	private readonly persistenceService = inject(PersistenceService);
	private readonly store = inject(Store);
	private readonly appService = inject(AppService);

	private authState!: IAuthState;

	public handleResetSigninReCaptcha!: () => void;

	constructor() {
		// added isBrowser check to make sure below code snippet don't run on server side (SSR)

		if (this.appService.isBrowser()) {
			const accessToken = this.persistenceService.get(this.constants.LOCAL_STORAGE_KEYS.ACCESS_TOKEN);

			if (!!accessToken) {
				// fetch the user data from backend to populate the store
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
		return this.http.post<ISigninResponse>(
			`${environment.baseUrl}/${this.constants.API_PREFIX.API_V1}/auth/signin`,
			data
		);
	}

	public postSignout(): Observable<any> {
		return this.http.post(`${environment.baseUrl}/${this.constants.API_PREFIX.API_V1}/auth/signout`, {});
	}

	public postForgotPassword(data: any): Observable<IForgotPasswordResponse> {
		return this.http.post<IForgotPasswordResponse>(
			`${environment.baseUrl}/${this.constants.API_PREFIX.API_V1}/auth/forgot-password`,
			data
		);
	}

	public patchResetPassword(data: any): Observable<IResetPasswordResponse> {
		return this.http.patch<IResetPasswordResponse>(
			`${environment.baseUrl}/${this.constants.API_PREFIX.API_V1}/auth/reset-password/${data.token}`,
			data
		);
	}

	public getMe(): Observable<any> {
		return this.http.get(`${environment.baseUrl}/${this.constants.API_PREFIX.API_V1}/auth/me`);
	}

	public getRefresh(): Observable<any> {
		return this.http.post(`${environment.baseUrl}/${this.constants.API_PREFIX.API_V1}/auth/refresh`, {
			refreshToken:
				this.authState.currentUser?.refreshToken ||
				this.persistenceService.get(this.constants.LOCAL_STORAGE_KEYS.REFRESH_TOKEN) ||
				'',
		});
	}

	public postProfilePicture(data: any): Observable<any> {
		return this.http.post(`${environment.baseUrl}/${this.constants.API_PREFIX.API_V1}/user/profile-picture`, data);
	}
}
