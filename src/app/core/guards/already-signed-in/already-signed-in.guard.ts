import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { IAuthState } from '@coreModels/';
import { Constants } from '@coreShared/';
import { authFeature } from '@coreStore/';
import { Store } from '@ngrx/store';

export const alreadySignedInGuard: CanMatchFn = (route, segments) => {
	const constants = inject(Constants);
	const router = inject(Router);
	const store = inject(Store);

	// console.log({ route, segments });

	let authState!: IAuthState;

	store.select(authFeature.selectAuthState).subscribe({
		next: (data) => {
			authState = data;
		},
		error: () => {},
		complete: () => {},
	});

	return authState.currentUser ? router.createUrlTree([constants.ROUTES.DASHBOARD]) : true;
};
