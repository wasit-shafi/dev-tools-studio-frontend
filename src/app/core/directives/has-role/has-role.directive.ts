import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { AuthService } from '@coreServices/';

@Directive({
	selector: '[appHasRole]',
	standalone: true,
})
export class HasRoleDirective {
	@Input()
	set appHasRole(roles: number[]) {
		// TODO(Wasit): add support to use some() or every() based on usage
		// something like this: https://juri.dev/blog/2018/02/angular-permission-directive/
		
		const hasAllRoles = roles.every((role) => this.authService.hasRole(role));

		if (hasAllRoles) {
			this.viewContainerRef.createEmbeddedView(this.templateRef);
		} else {
			this.viewContainerRef.clear();
		}
	}

	constructor(
		private templateRef: TemplateRef<any>,
		private viewContainerRef: ViewContainerRef,
		private authService: AuthService
	) {}
}
