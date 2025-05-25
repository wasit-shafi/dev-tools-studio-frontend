import { inject } from '@angular/core';

import { Constants } from './constants';

export class Utils {
	private readonly constants = inject(Constants);

	public getUserRoleNames(roles: number | number[]): string {
		if (typeof roles === 'number') {
			// @ts-ignore
			return this.constants.ACCESS_ROLES_NAMES[roles];
		}

		// @ts-ignore
		return roles.map((role) => this.constants.ACCESS_ROLES_NAMES[role]).toString();
	}

	public getCountryName(code: string): string {
		return (
			this.constants.COUNTRY_METADATA.find((countryData) => countryData.code === code || countryData.alpha_3 === code)
				?.name ?? ''
		);
	}
}
