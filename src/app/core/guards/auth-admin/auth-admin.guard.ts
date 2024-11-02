import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { AuthService } from '@coreServices/auth/auth.service';
import { Constants } from '@coreShared/';

export const authAdminGuard: CanMatchFn = (route, segments) => {
	const constants = inject(Constants);
	const authService = inject(AuthService);

	return authService.roles().includes(constants.USER_ROLES.ADMIN);
};
