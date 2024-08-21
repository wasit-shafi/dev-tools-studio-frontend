import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { Constants } from '@coreShared/';
import { environment } from '@environments/';

@Component({
	selector: 'app-mail',
	standalone: true,
	imports: [FormsModule],
	providers: [Constants, NgForm],
	templateUrl: './mail.component.html',
	styleUrl: './mail.component.scss',
})
export class MailComponent {
	title = 'dev-tools-studio';
	users: any;

	private http = inject(HttpClient);
	private constants = inject(Constants);

	public sendEmailFormModel = {
		to: '',
		subject: '',
		salutation: '',
		body: '',
		closing: '',
		signature: '',
	};

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
