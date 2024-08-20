import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

import { AuthService } from '@coreServices/';

export const alreadySignedInGuard: CanMatchFn = (route, segments) => {
	const router = inject(Router);
	const authService = inject(AuthService);
	// console.log({ route, segments });

	return authService.isAuthenticated ? router.createUrlTree(['/dashboard']) : true;
};
