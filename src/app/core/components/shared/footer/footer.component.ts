import { Component } from '@angular/core';

@Component({
	selector: 'dts-footer',
	imports: [],
	templateUrl: './footer.component.html',
	styleUrl: './footer.component.scss',
})
export class FooterComponent {
	protected readonly fullYear: number = new Date().getFullYear();
}
