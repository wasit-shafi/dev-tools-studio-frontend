import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { authFeature } from '@coreStore/index';
import { IAuthState } from '@coreStore/auth/auth.model';

export const alreadySignedInGuard: CanMatchFn = (route, segments) => {
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

	return authState.currentUser ? router.createUrlTree(['/dashboard']) : true;
};
