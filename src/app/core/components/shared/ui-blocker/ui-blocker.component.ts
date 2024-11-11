import { Store } from '@ngrx/store';
import { Component, inject } from '@angular/core';

@Component({
	selector: 'dts-ui-blocker',
	standalone: true,
	imports: [],
	templateUrl: './ui-blocker.component.html',
	styleUrl: './ui-blocker.component.scss',
})
export class UiBlockerComponent {
	// public store = inject(Store);
	uiBlockerPrimaryText = 'Loading...';

	constructor() {}
}
