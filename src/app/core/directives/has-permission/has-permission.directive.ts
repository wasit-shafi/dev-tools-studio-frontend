import { Directive, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Constants } from '@app/core/shared';
import { IAuthState, IHasPermissionDirective } from '@coreModels/';
import { authFeature } from '@coreStore/';
import { Store } from '@ngrx/store';

@Directive({
	selector: '[dtsHasPermission]',
})
export class HasPermissionDirective {
	private readonly store = inject(Store);
	private authState!: IAuthState;
	private readonly constants = inject(Constants);

	@Input()
	set dtsHasPermission(params: IHasPermissionDirective) {
		const currentUserRoles = this.authState?.currentUser?.roles || [];
		const isAllowed =
			params.operation === this.constants.ACCESS_OPERATIONS.AND
				? params.roles.every((role) => currentUserRoles.includes(role))
				: params.roles.some((role) => currentUserRoles.includes(role));

		if (isAllowed) {
			this.viewContainerRef.createEmbeddedView(this.templateRef);
		} else {
			this.viewContainerRef.clear();
		}
	}

	constructor(
		private readonly templateRef: TemplateRef<any>,
		private readonly viewContainerRef: ViewContainerRef
	) {
		this.store.select(authFeature.selectAuthState).subscribe({
			next: (data) => {
				this.authState = data;
			},
		});
	}
}
