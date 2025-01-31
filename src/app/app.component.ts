import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FooterComponent, HeaderComponent } from '@coreComponents/';
import { UiBlockerComponent } from '@coreComponents/shared/ui-blocker/ui-blocker.component';
import { ToastService } from '@coreServices/';
import { Constants, Mocks } from '@coreShared/';
import { environment } from '@environments/environment';

@Component({
	selector: 'dts-root',
	providers: [Constants, Mocks],
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
export class AppComponent implements OnInit {
	protected readonly constants = inject(Constants);
	protected readonly mocks = inject(Mocks);
	protected readonly toastService = inject(ToastService);

	protected readonly environment = environment;
	private readonly CONSOLE_MESSAGE = `Dev Tools Studio: WARNING!\nUsing this console may allow attackers to impersonate you and steal your information using an attack called Self-XSS.Do not enter or paste code that you do not understand.`;

	constructor() {}

	ngOnInit(): void {
		console.warn(
			`%c${this.CONSOLE_MESSAGE}`,
			'display: inline-block ; background-color: red ; color: black ;font-size:20px; font-weight: bold ; padding: 5px 7px;'
		);
	}
}
