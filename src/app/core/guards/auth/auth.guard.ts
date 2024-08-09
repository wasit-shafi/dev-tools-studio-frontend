import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '@coreServices/auth/auth.service';

export const authGuard: CanMatchFn = (route, segments) => {
	const router = inject(Router);
	const authService = inject(AuthService);

	// console.log('authGuard :: route :: ', route);
	// console.log('authGuard :: segment :: ', segments);

	// NOTE: to avoid navigating to signin and return false i have used createUrlTree(), for more info refer : https://medium.com/@aaaronnte/how-to-redirect-inside-a-guard-in-angular-v7-1-0-5e860bd0ba1c

	return authService.getUserSignedIn || router.createUrlTree(['/signin']);
};
