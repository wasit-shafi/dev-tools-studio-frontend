import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FooterComponent, HeaderComponent } from '@coreComponents/';
import { UiBlockerComponent } from '@coreComponents/shared/ui-blocker/ui-blocker.component';
import { ToastService } from '@coreServices/';
import { Constants } from '@coreShared/';
import { environment } from '@environments/environment';

@Component({
	selector: 'dts-root',
	providers: [Constants],
	imports: [
		RouterOutlet,
		CommonModule,
		HeaderComponent,
		FooterComponent,
		RouterLink,
		RouterLinkActive,
		UiBlockerComponent,
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	protected readonly constants = inject(Constants);
	protected readonly toastService = inject(ToastService);

	protected environment = environment;

	protected tempTestRoutes: any = {
		guestUserRoutes: {
			routeList: [
				{ url: '', text: 'Home' },
				{ url: 'contact', text: 'Contact' },
				{ url: 'signup', text: 'Sign Up' },
				{ url: 'signin', text: 'Sign In' },
				{ url: 'reset-password', text: 'Reset Password' },
			],
			className: 'text-green-500 hover:bg-sky-400 hover:text-stone-600',
		},
		regularUserRoutes: {
			routeList: [
				{ url: 'dashboard', text: 'Dashboard' },
				{ url: 'settings', text: 'Settings' },
			],
			className: 'text-red-500 hover:bg-sky-400 hover:text-stone-600',
		},
		adminUserRoutes: {
			routeList: [{ url: 'control-panel', text: 'Control Panel' }],
			className: 'text-purple-500 hover:bg-sky-400 hover:text-stone-600',
		},
		otherRoutes: {
			routeList: [{ url: 'sample-random-url', text: 'Random Url' }],
			className: 'text-lime-500 hover:bg-sky-400 hover:text-stone-600',
		},
	};
	constructor() {
		// transforming testTempRoutes

		this.tempTestRoutes = [
			...this.tempTestRoutes.guestUserRoutes.routeList.map((item: any) => {
				return { ...item, className: this.tempTestRoutes.guestUserRoutes.className };
			}),
			...this.tempTestRoutes.regularUserRoutes.routeList.map((item: any) => {
				return { ...item, className: this.tempTestRoutes.regularUserRoutes.className };
			}),
			...this.tempTestRoutes.adminUserRoutes.routeList.map((item: any) => {
				return { ...item, className: this.tempTestRoutes.adminUserRoutes.className };
			}),
			...this.tempTestRoutes.otherRoutes.routeList.map((item: any) => {
				return { ...item, className: this.tempTestRoutes.otherRoutes.className };
			}),
		];
	}
}
