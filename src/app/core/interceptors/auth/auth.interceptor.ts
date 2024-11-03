import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { authFeature } from '@coreStore/index';
import { Store } from '@ngrx/store';

import { IAuthState } from '../../store/auth/auth.model';

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
