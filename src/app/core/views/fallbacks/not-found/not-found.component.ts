import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Constants } from '@coreShared/index';

@Component({
	selector: 'dts-not-found',
	standalone: true,
	imports: [RouterLink],
	templateUrl: './not-found.component.html',
	styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
	public readonly constants = inject(Constants);
}
