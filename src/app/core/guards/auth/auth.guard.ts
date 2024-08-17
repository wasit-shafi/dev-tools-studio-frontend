import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '@coreServices/auth/auth.service';

export const authGuard: CanMatchFn = (route, segments) => {
	const router = inject(Router);
	const authService = inject(AuthService);
	// console.log({ route, segments });

	// NOTE: to avoid navigating to signin and return false i have used createUrlTree(), for more info refer : https://medium.com/@aaaronnte/how-to-redirect-inside-a-guard-in-angular-v7-1-0-5e860bd0ba1c

	return authService.isUserSignedIn() || router.createUrlTree(['/signin']);
};
