import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@coreServices/auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
	const authService = inject(AuthService);

	const newRequest = request.clone({
		headers: request.headers.set('Authorization', `Bearer ${authService.getAccessToken}`),
	});
	return next(newRequest);
};
