import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Constants } from '@coreShared/';

@Component({
	selector: 'dts-not-found',
	imports: [RouterLink],
	templateUrl: './not-found.component.html',
	styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
	public readonly constants = inject(Constants);

	constructor() {}
}
