import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { IAuthState } from '@coreModels/';
import { authFeature } from '@coreStore/';
import { Store } from '@ngrx/store';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
	const store = inject(Store);
	let authState!: IAuthState;

	store.select(authFeature.selectAuthState).subscribe((data) => {
		authState = data;
	});

	const accessToken = authState?.currentUser?.accessToken || '';

	const newRequest = request.clone({
		headers: request.headers.set('Authorization', `Bearer ${accessToken}`),
		withCredentials: true,
	});
	return next(newRequest);
};
