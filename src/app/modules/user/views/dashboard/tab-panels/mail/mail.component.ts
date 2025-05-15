import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ToastService } from '@coreServices/';
import { Constants } from '@coreShared/';
import { environment } from '@environments/';
import { Store } from '@ngrx/store';
import { ICredentialData } from '@userModels/';
import { userFeature } from '@userStore/';

@Component({
	selector: 'dts-mail',
	imports: [ReactiveFormsModule, JsonPipe],
	providers: [Constants, FormBuilder],
	templateUrl: './mail.component.html',
	styleUrl: './mail.component.scss',
})
export class MailComponent implements OnInit {
	private readonly constants = inject(Constants);
	private readonly formBuilder = inject(FormBuilder);
	private readonly http = inject(HttpClient);
	private readonly store = inject(Store);
	private readonly toastService = inject(ToastService);

	private readonly date = new Date();
	// NOTE(Wasit): the min should strictly follow the format YYYY-MM-DDTHH:MM, used padStart to make sure the 0 are prefixed incase of value is less than 10 eg 2025-4-9T5:9 => 2025-04-09T05:09

	protected readonly minDateTimeLocal = `${this.date.getFullYear()}-${String(this.date.getMonth() + 1).padStart(2, '0')}-${String(this.date.getDate()).padStart(2, '0')}T${String(this.date.getHours()).padStart(2, '0')}:${String(this.date.getMinutes()).padStart(2, '0')}:00.00`;

	protected credentialList: ICredentialData[] = [];

	private readonly INITIAL_SMTP_CREDENTIALS = {
		credentialType: 0,
		host: '',
		port: 0,
		user: '',
		pass: '',
	};

	protected currentSmtpCredentials = {
		...this.INITIAL_SMTP_CREDENTIALS,
	};

	protected readonly mailForm = this.formBuilder.nonNullable.group({
		from: ['', [Validators.required, Validators.email]],
		dateTimeLocal: ['', [Validators.required, this.customValidatorForDateTimeLocal]],
		to: ['', [Validators.required, Validators.email]],
		subject: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
		salutation: ['', [Validators.required]],
		body: ['', [Validators.required]],
		closing: ['', [Validators.required]],
		signature: ['', [Validators.required]],
		attachments: this.formBuilder.array([this.formBuilder.control('')]),
		receiveConfirmationEmail: [true, [Validators.required]],
	});

	ngOnInit(): void {
		this.store.select(userFeature.selectCredentialList).subscribe({
			next: (data) => {
				this.credentialList = data ?? [];
			},
			error: () => {},
			complete: () => {},
		});
	}

	get subject() {
		return this.mailForm.get('subject');
	}
	get dateTimeLocal() {
		return this.mailForm.get('dateTimeLocal');
	}
	// Added custom validator for dateTimeLocal, as the min validation for 'time' only was not working properly

	private customValidatorForDateTimeLocal(control: AbstractControl): ValidationErrors | null {
		const currentDate = new Date();
		const scheduledDate = new Date(control.value);

		return scheduledDate < currentDate ? { min: "Date & Time can't be less than current date & time" } : null;
	}

	handleOnSubmitSendEmailForm(): void {
		const url = `${environment.baseUrl}/${this.constants.API_PREFIX.API_V1}/user/email`;

		this.http
			.post(url, {
				...this.mailForm.value,
				dateTimeLocal: new Date(this.mailForm.getRawValue().dateTimeLocal).toISOString(),
			})
			.subscribe({
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

	protected handleOnFromEmailChange(selectedEmailId: string): void {
		const item = this.credentialList.find((item) => item.emailId === selectedEmailId);
		this.currentSmtpCredentials = item ? { ...item } : { ...this.INITIAL_SMTP_CREDENTIALS };
	}
}
