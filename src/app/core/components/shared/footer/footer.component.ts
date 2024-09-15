import { Component } from '@angular/core';

@Component({
	selector: 'dts-footer',
	standalone: true,
	imports: [],
	templateUrl: './footer.component.html',
	styleUrl: './footer.component.scss',
})
export class FooterComponent {
	public fullYear: number = new Date().getFullYear();
}
