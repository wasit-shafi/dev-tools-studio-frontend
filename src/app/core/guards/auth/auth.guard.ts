import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { authFeature } from '@coreStore/index';
import { IAuthState } from '@coreStore/auth/auth.model';

export const authGuard: CanMatchFn = (route, segments) => {
	const store = inject(Store);
	const router = inject(Router);

	let authState!: IAuthState;

	// console.log({ route, segments });

	store.select(authFeature.selectAuthState).subscribe((data) => {
		authState = data;
	});

	// NOTE: to avoid navigating to signin and return false i have used createUrlTree(), for more info refer : https://medium.com/@aaaronnte/how-to-redirect-inside-a-guard-in-angular-v7-1-0-5e860bd0ba1c

	return !!authState.currentUser || router.createUrlTree(['/signin']);
};
