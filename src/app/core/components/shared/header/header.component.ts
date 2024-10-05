import { Component, inject } from '@angular/core';

import { NavComponent } from '../nav/nav.component';

import { AuthService } from '@coreServices/';
import { Router } from '@angular/router';

@Component({
	selector: 'dts-header',
	standalone: true,
	imports: [NavComponent],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
})
export class HeaderComponent {
	private readonly router = inject(Router);
	private readonly authService = inject(AuthService);

	public handleSignOut = () => {
		this.authService.changeAuthStatus({
			status: false,
		});
		this.router.navigate(['/']);
	};
}
