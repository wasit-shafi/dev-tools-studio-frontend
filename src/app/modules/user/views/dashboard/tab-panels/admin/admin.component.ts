import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Constants } from '@coreShared/';
import { environment } from '@environments/';

@Component({
	selector: 'dts-admin',
	standalone: true,
	imports: [],
	templateUrl: './admin.component.html',
	styleUrl: './admin.component.scss',
})
export class AdminComponent {
	users: any;

	private http = inject(HttpClient);
	private constants = inject(Constants);

	constructor() {
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
