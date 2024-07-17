import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Constants } from '@coreShared/';

@Component({
	selector: 'app-nav',
	standalone: true,
	providers: [Constants],
	imports: [CommonModule, RouterLink],
	templateUrl: './nav.component.html',
	styleUrl: './nav.component.scss',
})
export class NavComponent {
	constructor(public constants: Constants) {}
}
