import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Constants } from '@shared/';
import { environment } from '@environments/';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [],
	providers: [Constants],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
})
export class HomeComponent {
	title = 'dev-tools-studio';
	users: any;

	private http = inject(HttpClient);

	constructor(public constants: Constants) {
		const url = `${environment.baseUrl}${this.constants.API._V1}/user`;

		this.http.get(url).subscribe({
			next: (response) => {
				this.users = response;
			},
			error: (error) => {
				console.log('error :: ', error);
			},
		});
	}
}
