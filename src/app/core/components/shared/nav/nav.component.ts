import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Constants } from '@coreShared/';

import { AuthService } from '@coreServices/';
import { HasRoleDirective } from '@coreDirectives/';

@Component({
	selector: 'dts-nav',
	standalone: true,
	providers: [Constants],
	imports: [CommonModule, RouterLink, RouterLinkActive, HasRoleDirective],
	templateUrl: './nav.component.html',
	styleUrl: './nav.component.scss',
})
export class NavComponent {
	private readonly router = inject(Router);
	public readonly constants = inject(Constants);
	public readonly authService = inject(AuthService);

	public handleSignOut = () => {
		this.authService.changeAuthStatus({
			status: false,
		});
		this.router.navigate(['/']);
	};
}
