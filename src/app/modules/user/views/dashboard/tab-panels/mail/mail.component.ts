import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '@coreServices/';
import { Constants } from '@coreShared/';
import { environment } from '@environments/';

@Component({
	selector: 'dts-mail',
	imports: [ReactiveFormsModule, JsonPipe],
	providers: [Constants, FormBuilder],
	templateUrl: './mail.component.html',
	styleUrl: './mail.component.scss',
})
export class MailComponent {
	private readonly constants = inject(Constants);
	private readonly formBuilder = inject(FormBuilder);
	private readonly http = inject(HttpClient);
	private readonly toastService = inject(ToastService);

	title = 'dev-tools-studio';
	users: any;

	protected readonly mailForm = this.formBuilder.nonNullable.group({
		dateTimeLocal: ['', [Validators.required]],
		to: ['wasitshafi700@gmail.com', [Validators.required, Validators.email]],
		subject: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
		salutation: ['', [Validators.required]],
		body: ['', [Validators.required]],
		closing: ['', [Validators.required]],
		signature: ['', [Validators.required]],
		attachments: this.formBuilder.array([this.formBuilder.control('')]),
		confirmationMail: [true, [Validators.required]],
	});

	get subject() {
		return this.mailForm.get('subject');
	}

	handleOnSubmitSendEmailForm(): void {
		const url = `${environment.baseUrl}${this.constants.API._V1}/mail/send`;

		this.http.post(url, { ...this.mailForm.value }).subscribe({
			next: (response: any) => {
				// console.log('response ::', response);
				this.toastService.enqueueToastNotification({
					message: response.message,
				});
			},
			error: (error) => {
				// console.log('error :: ', error);
				this.toastService.enqueueToastNotification({
					message: error.error.message || error.message,
					type: this.constants.ALERT_TYPE.ERROR,
				});
			},
		});
	}
}
