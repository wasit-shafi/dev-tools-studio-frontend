import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { authFeature } from '@coreStore/index';
import { IAuthState } from '@coreStore/auth/auth.model';
import { Constants } from '@coreShared/index';

export const alreadySignedInGuard: CanMatchFn = (route, segments) => {
	const store = inject(Store);
	const router = inject(Router);
	const constants = inject(Constants);

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
