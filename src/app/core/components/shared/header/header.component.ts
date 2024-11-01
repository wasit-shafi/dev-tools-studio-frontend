import { Component } from '@angular/core';

import { NavComponent } from '../nav/nav.component';

@Component({
	selector: 'dts-header',
	standalone: true,
	imports: [NavComponent],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
})
export class HeaderComponent {}
