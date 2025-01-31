import { Directive, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { IAuthState } from '@coreModels/';
import { authFeature } from '@coreStore/';
import { Store } from '@ngrx/store';

// import { AuthService } from '@coreServices/';

@Directive({
	selector: '[appHasRole]',
	standalone: true,
})
export class HasRoleDirective {
	private readonly store = inject(Store);
	private authState!: IAuthState;

	@Input()
	set appHasRole(roles: number[]) {
		// TODO(WASIT): add support to use some() or every() based on usage
		// something like this: https://juri.dev/blog/2018/02/angular-permission-directive/

		const hasAllRoles = roles.every((role) => (this.authState?.currentUser?.roles || []).includes(role));

		if (hasAllRoles) {
			this.viewContainerRef.createEmbeddedView(this.templateRef);
		} else {
			this.viewContainerRef.clear();
		}
	}

	constructor(
		private templateRef: TemplateRef<any>,
		private viewContainerRef: ViewContainerRef
	) {
		this.store.select(authFeature.selectAuthState).subscribe({
			next: (data) => {
				this.authState = data;
			},
		});
	}
}
