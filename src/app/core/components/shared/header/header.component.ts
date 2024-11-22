import { Component } from '@angular/core';

import { NavComponent } from '../nav/nav.component';

@Component({
	selector: 'dts-header',
	imports: [NavComponent],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
})
export class HeaderComponent {}
