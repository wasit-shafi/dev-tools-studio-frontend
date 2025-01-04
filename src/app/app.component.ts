import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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
export class AppComponent {
	protected readonly constants = inject(Constants);
	protected readonly mocks = inject(Mocks);
	protected readonly toastService = inject(ToastService);

	protected readonly environment = environment;

	constructor() {}
}
