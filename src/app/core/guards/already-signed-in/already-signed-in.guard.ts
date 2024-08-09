import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

import { AuthService } from '@coreServices/';

export const alreadySignedInGuard: CanMatchFn = (route, segments) => {
	const router = inject(Router);
	const authService = inject(AuthService);
	// console.log('alreadySignedInGuard :: route :: ', route);
	// console.log('alreadySignedInGuard :: segment :: ', segments);

	return authService.getUserLoggedIn ? router.createUrlTree(['/dashboard']) : true;
};
