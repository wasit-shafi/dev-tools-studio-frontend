import { Component, inject } from '@angular/core';
import { Constants } from '@coreShared/';

@Component({
	selector: 'dts-admin',
	imports: [],
	templateUrl: './admin.component.html',
	styleUrl: './admin.component.scss',
})
export class AdminComponent {
	private readonly constants = inject(Constants);

	constructor() {}
}
