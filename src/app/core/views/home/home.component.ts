import { Component } from '@angular/core';
import { environment } from '@environments/';

@Component({
	selector: 'dts-home',
	imports: [],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
})
export class HomeComponent {
	protected readonly environment = environment;
}
