import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { IAuthState } from '@coreModels/';
import { PersistenceService } from '@coreServices/';
import { Constants } from '@coreShared/';
import { authFeature } from '@coreStore/';
import { Store } from '@ngrx/store';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
	const constants = inject(Constants);
	const persistenceService = inject(PersistenceService);
	const store = inject(Store);

	let authState!: IAuthState;

	store.select(authFeature.selectAuthState).subscribe({
		next: (data) => {
			authState = data;
		},
	});

	let token: string = '';

	if (request.url.endsWith('/auth/refresh')) {
		token =
			authState?.currentUser?.refreshToken ??
			String(persistenceService.get(constants.LOCAL_STORAGE_KEYS.REFRESH_TOKEN));
	} else {
		token =
			authState?.currentUser?.accessToken ?? String(persistenceService.get(constants.LOCAL_STORAGE_KEYS.ACCESS_TOKEN));
	}

	const newRequest = request.clone({
		headers: request.headers.set('Authorization', `Bearer ${token}`),
		withCredentials: true,
	});
	return next(newRequest);
};
