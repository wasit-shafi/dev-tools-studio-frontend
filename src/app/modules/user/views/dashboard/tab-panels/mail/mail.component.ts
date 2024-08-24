import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { Constants } from '@coreShared/';
import { environment } from '@environments/';

@Component({
	selector: 'app-mail',
	standalone: true,
	imports: [ReactiveFormsModule],
	providers: [Constants, FormBuilder],
	templateUrl: './mail.component.html',
	styleUrl: './mail.component.scss',
})
export class MailComponent {
	title = 'dev-tools-studio';
	users: any;

	private http = inject(HttpClient);
	private constants = inject(Constants);
	private formBuilder = inject(FormBuilder);

	public mailForm = this.formBuilder.group({
		to: ['', Validators.required],
		subject: ['', Validators.required],
		salutation: ['', Validators.required],
		body: ['', Validators.required],
		closing: ['', Validators.required],
		signature: ['', Validators.required],
		attachments: this.formBuilder.array([this.formBuilder.control('')]),
	});

	handleOnSubmitSendEmailForm() {
		const url = `${environment.baseUrl}${this.constants.API._V1}/mail/send`;

		this.http.post(url, { ...this.mailForm.value }).subscribe({
			next: (response) => {
				console.log('response ::', response);
			},
			error: (error) => {
				console.log('error :: ', error);
			},
		});
	}
}
