import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { AuthService } from '@coreServices/auth/auth.service';
import { Constants } from '@coreShared/';

export const authAdminGuard: CanMatchFn = (route, segments) => {
	const authService = inject(AuthService);
	const constants = inject(Constants);

	return authService.roles().includes(constants.USER_ROLES.ADMIN);
};
