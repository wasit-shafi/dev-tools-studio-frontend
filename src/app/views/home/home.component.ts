import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Constants } from '@shared/';
import { environment } from '@environments/';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [FormsModule],
	providers: [Constants, NgForm],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
})
export class HomeComponent {
	title = 'dev-tools-studio';
	users: any;
	public sendEmailFormModel = {
		to: '',
		subject: '',
		salutation: '',
		body: '',
		closing: '',
		signature: '',
	};
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

	handleOnSubmitSendEmailForm(event: SubmitEvent, form: NgForm) {
		event.preventDefault();
		const url = `${environment.baseUrl}${this.constants.API._V1}/mail/send`;

		this.http.post(url, { ...this.sendEmailFormModel }).subscribe({
			next: (response) => {
				console.log('response ::', response);
			},
			error: (error) => {
				console.log('error :: ', error);
			},
		});
	}
}
