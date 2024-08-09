import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Constants } from '@coreShared/';

import { AuthService } from '@coreServices/';

@Component({
	selector: 'app-nav',
	standalone: true,
	providers: [Constants],
	imports: [CommonModule, RouterLink],
	templateUrl: './nav.component.html',
	styleUrl: './nav.component.scss',
})
export class NavComponent {
	public router = inject(Router);
	public constants = inject(Constants);
	public authService = inject(AuthService);

	public handleSignOut = () => {
		this.authService.setUserSignedIn = false;
		this.router.navigate(['/']);
	};
}
