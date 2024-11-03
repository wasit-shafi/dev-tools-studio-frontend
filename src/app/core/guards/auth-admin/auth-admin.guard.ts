import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { Constants } from '@coreShared/';
import { IAuthState } from '@coreStore/auth/auth.model';
import { authFeature } from '@coreStore/index';
import { Store } from '@ngrx/store';

export const authAdminGuard: CanMatchFn = (route, segments) => {
	const constants = inject(Constants);
	const store = inject(Store);

	let authState!: IAuthState;

	store.select(authFeature.selectAuthState).subscribe((data) => {
		authState = data;
	});

	return (authState?.currentUser?.roles || []).includes(constants.USER_ROLES.ADMIN);
};
