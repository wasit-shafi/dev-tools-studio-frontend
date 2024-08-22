import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { HeaderComponent, FooterComponent } from '@coreComponents/';

import { Constants } from '@coreShared/';
import { environment } from '@environments/environment';
import { ToastService } from '@coreServices/';

@Component({
	selector: 'app-root',
	standalone: true,
	providers: [Constants],
	imports: [RouterOutlet, CommonModule, HeaderComponent, FooterComponent, RouterLink, RouterLinkActive],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	public mockLinks;
	public environment = environment;
	public constants = inject(Constants);
	public toastService = inject(ToastService);

	constructor() {
		this.mockLinks = Object.keys(this.constants.ROUTES).map((key) => ({
			text: key,
			url: this.constants.ROUTES[key],
		}));
	}
}
