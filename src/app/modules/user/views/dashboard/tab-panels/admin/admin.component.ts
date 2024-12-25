import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Constants } from '@coreShared/';
import { environment } from '@environments/';

@Component({
	selector: 'dts-admin',
	imports: [],
	templateUrl: './admin.component.html',
	styleUrl: './admin.component.scss',
})
export class AdminComponent {
	private readonly constants = inject(Constants);
	private readonly http = inject(HttpClient);

	protected users: any;

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
