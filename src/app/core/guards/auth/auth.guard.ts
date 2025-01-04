import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { IAuthState } from '@coreModels/';
import { Constants } from '@coreShared/';
import { authFeature } from '@coreStore/';
import { Store } from '@ngrx/store';

export const authGuard: CanMatchFn = (route, segments) => {
	const constants = inject(Constants);
	const router = inject(Router);
	const store = inject(Store);

	let authState!: IAuthState;

	// console.log({ route, segments });

	store.select(authFeature.selectAuthState).subscribe({
		next: (data) => {
			authState = data;
		},
	});

	// NOTE: to avoid navigating to signin and return false i have used createUrlTree(), for more info refer : https://medium.com/@aaaronnte/how-to-redirect-inside-a-guard-in-angular-v7-1-0-5e860bd0ba1c

	return !!authState.currentUser || router.createUrlTree([constants.ROUTES.SIGNIN]);
};
