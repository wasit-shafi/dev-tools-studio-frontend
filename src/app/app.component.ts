import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { HeaderComponent, FooterComponent } from '@coreComponents/';
import { Constants } from '@coreShared/';
import { environment } from '@environments/environment';

@Component({
	selector: 'app-root',
	standalone: true,
	providers: [Constants],
	imports: [RouterOutlet, CommonModule, HeaderComponent, FooterComponent, RouterLink],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	public mockLinks;
	public environment = environment;
	private constants = inject(Constants);

	constructor() {
		this.mockLinks = Object.keys(this.constants.ROUTES).map((key) => ({
			text: key,
			url: this.constants.ROUTES[key],
		}));
	}
}
