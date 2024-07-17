import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Constants } from '@coreShared/';
import { environment } from '@environments/';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
	selector: 'app-user-home',
	standalone: true,
	imports: [FormsModule],
	providers: [Constants, NgForm],
	templateUrl: './user-home.component.html',
	styleUrl: './user-home.component.scss',
})
export class UserHomeComponent {
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
