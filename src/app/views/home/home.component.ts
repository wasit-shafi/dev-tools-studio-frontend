import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/';
import { constants } from '@shared/constants';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
})
export class HomeComponent {
	title = 'dev-tools-studio';
	users: any;

	private http = inject(HttpClient);

	constructor() {
		const url = `${environment.baseUrl}${constants.api._V1}/user`;

		this.http.get(url).subscribe({
			next: (response) => {
				this.users = response;
				console.log('response :: ', response);
			},
			error: (error) => {
				console.log('error :: ', error);
			},
		});
	}
}
