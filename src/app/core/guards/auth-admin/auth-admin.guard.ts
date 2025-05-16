import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { IAuthState } from '@coreModels/';
import { Constants } from '@coreShared/';
import { authFeature } from '@coreStore/';
import { Store } from '@ngrx/store';

export const authAdminGuard: CanMatchFn = (route, segments) => {
	const constants = inject(Constants);
	const store = inject(Store);

	let authState!: IAuthState;

	store.select(authFeature.selectAuthState).subscribe({
		next: (data) => {
			authState = data;
		},
	});

	const roles = authState?.currentUser?.roles || [];

	return roles.includes(constants.ACCESS_ROLES.ADMIN) || roles.includes(constants.ACCESS_ROLES.SUPER_ADMIN);
};
