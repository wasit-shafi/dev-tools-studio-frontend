import { Component, inject, OnInit } from '@angular/core';
import {
	AbstractControl,
	FormArray,
	FormBuilder,
	FormControl,
	ReactiveFormsModule,
	ValidationErrors,
	Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Constants } from '@coreShared/';
import { Store } from '@ngrx/store';
import { IAttachmentData, ICredentialData, IEmailTemplateData } from '@userModels/';
import { userActions, userFeature } from '@userStore/';

@Component({
	selector: 'dts-email',
	imports: [ReactiveFormsModule, RouterLink],
	providers: [Constants, FormBuilder],
	templateUrl: './email.component.html',
	styleUrl: './email.component.scss',
})
export class EmailComponent implements OnInit {
	private readonly constants = inject(Constants);
	private readonly formBuilder = inject(FormBuilder);
	private readonly store = inject(Store);

	private readonly date = new Date();
	// NOTE(Wasit): the min should strictly follow the format YYYY-MM-DDTHH:MM, used padStart to make sure the 0 are prefixed incase of value is less than 10 eg 2025-4-9T5:9 => 2025-04-09T05:09

	protected readonly minDateTimeLocal = `${this.date.getFullYear()}-${String(this.date.getMonth() + 1).padStart(2, '0')}-${String(this.date.getDate()).padStart(2, '0')}T${String(this.date.getHours()).padStart(2, '0')}:${String(this.date.getMinutes()).padStart(2, '0')}:00.00`;

	protected credentialList: ICredentialData[] = [];
	protected emailTemplateList: IEmailTemplateData[] = [];
	protected dataListData: {
		SUBJECT: string[];
		SALUTATION: string[];
		BODY: string[];
		CLOSING: string[];
		SIGNATURE: string[];
	} = {
		SUBJECT: [],
		SALUTATION: [],
		BODY: [],
		CLOSING: [],
		SIGNATURE: [],
	};
	protected attachmentList: IAttachmentData[] = [];

	private readonly INITIAL_SMTP_CREDENTIALS = {
		credentialType: '',
		host: '',
		port: '',
		emailId: '',
		pass: '',
	};

	protected currentSmtpCredentials = {
		...this.INITIAL_SMTP_CREDENTIALS,
	};

	protected readonly emailForm = this.formBuilder.nonNullable.group({
		emailTemplateId: ['', [Validators.required]],
		from: [{ value: '', disabled: true }, [Validators.required]],
		sendNow: [{ value: false, disabled: true }, [Validators.required]],
		dateTimeLocal: [{ value: '', disabled: true }, [Validators.required, this.customValidatorForDateTimeLocal]],
		to: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
		subject: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
		salutation: [{ value: '', disabled: true }, [Validators.required]],
		body: [{ value: '', disabled: true }, [Validators.required]],
		closing: [{ value: '', disabled: true }, [Validators.required]],
		signature: [{ value: '', disabled: true }, [Validators.required]],
		attachmentIds: this.formBuilder.array([]),
		receiveConfirmationEmail: [{ value: false, disabled: true }, [Validators.required]],
	});

	ngOnInit(): void {
		//  https://ngrx.io/guide/eslint-plugin/rules/avoid-dispatching-multiple-actions-sequentially

		this.store.dispatch(userActions.getCredentialList());
		this.store.dispatch(userActions.getEmailTemplateList());
		this.store.dispatch(userActions.getAttachmentList());

		this.store.select(userFeature.selectCredentialList).subscribe({
			next: (data) => {
				this.credentialList = data ?? [];
			},
			error: () => {},
			complete: () => {},
		});

		this.store.select(userFeature.selectEmailTemplateList).subscribe((emailTemplateList) => {
			this.emailTemplateList = emailTemplateList ?? [];

			const subject = new Set<string>();
			const salutation = new Set<string>();
			// TODO(Wasit): textarea don't support datalist, need some alternate way to handle multi-line text with datalist support

			const body = new Set<string>();
			const closing = new Set<string>();
			const signature = new Set<string>();

			emailTemplateList?.forEach((emailTemplate) => {
				subject.add(emailTemplate.subject);
				salutation.add(emailTemplate.salutation);
				body.add(emailTemplate.body);
				closing.add(emailTemplate.closing);
				signature.add(emailTemplate.signature);
			});

			this.dataListData.SUBJECT = Array.from(subject);
			this.dataListData.SALUTATION = Array.from(salutation);
			this.dataListData.BODY = Array.from(body);
			this.dataListData.CLOSING = Array.from(closing);
			this.dataListData.SIGNATURE = Array.from(signature);
		});

		this.emailForm.controls['emailTemplateId'].valueChanges.subscribe((newValue) => {
			const oldValue = this.emailForm.value['emailTemplateId'];
			const disabledControlNames: string[] = [
				'from',
				'dateTimeLocal',
				'sendNow',
				'to',
				'subject',
				'salutation',
				'body',
				'closing',
				'signature',
				'receiveConfirmationEmail',
			];

			if (!oldValue) {
				this.handleEnableOrDisableEmailFormInputs(disabledControlNames);
			}

			this.handleUpdateEmailFormInputs();
		});

		this.emailForm.controls['sendNow'].valueChanges.subscribe((sendNow) => {
			if (!sendNow) {
				this.emailForm.controls['dateTimeLocal'].setValidators([Validators.required]);
				this.handleEnableOrDisableEmailFormInputs(['dateTimeLocal']);
			} else {
				this.emailForm.controls['dateTimeLocal'].clearValidators();
				this.emailForm.controls['dateTimeLocal'].setValue('');
				this.handleEnableOrDisableEmailFormInputs(['dateTimeLocal'], false);
			}

			this.emailForm.controls['dateTimeLocal'].updateValueAndValidity();
		});

		this.store.select(userFeature.selectAttachmentList).subscribe({
			next: (data) => {
				this.attachmentList = data ?? [];
			},
			error: () => {},
			complete: () => {},
		});
	}

	private handleEnableOrDisableEmailFormInputs(controlNames: string[], enableControl = true): void {
		controlNames.forEach((controlNames) => {
			if (enableControl) {
				this.emailForm.get(controlNames)?.enable();
			} else {
				this.emailForm.get(controlNames)?.disable();
			}
		});
	}

	private handleUpdateEmailFormInputs(): void {
		const emailTemplate = this.emailTemplateList.find(
			(emailTemplate) => emailTemplate._id == this.emailForm.value.emailTemplateId
		);

		if (emailTemplate) {
			this.emailForm.get('subject')?.setValue(emailTemplate.subject);
			this.emailForm.get('salutation')?.setValue(emailTemplate.salutation);
			this.emailForm.get('body')?.setValue(emailTemplate.body);
			this.emailForm.get('closing')?.setValue(emailTemplate.closing);
			this.emailForm.get('signature')?.setValue(emailTemplate.signature);
		}
	}

	get subject() {
		return this.emailForm.get('subject');
	}

	get dateTimeLocal() {
		return this.emailForm.get('dateTimeLocal');
	}
	// Added custom validator for dateTimeLocal, as the min validation for 'time' only was not working properly

	private customValidatorForDateTimeLocal(control: AbstractControl): ValidationErrors | null {
		const currentDate = new Date();
		const scheduledDate = new Date(control.value);

		return scheduledDate < currentDate ? { min: "Date & Time can't be less than current date & time" } : null;
	}

	protected handleOnSubmitSendEmailForm(): void {
		const { emailTemplateId, ...data } = this.emailForm.getRawValue();

		//TODO(Wasit): temp fixed typing error for attachmentIds, need to set the type via generis for attachmentIds in reactive form
		const attachmentIds: string[] = data.attachmentIds as string[];

		this.store.dispatch(
			userActions.sendEmail({
				...data,
				dateTimeLocal: data.sendNow ? '' : new Date(data.dateTimeLocal).toISOString(),
				attachmentIds,
			})
		);
	}

	protected handleOnFromEmailChange(selectedEmailId: string): void {
		const item = this.credentialList.find((item) => item.emailId === selectedEmailId);
		this.currentSmtpCredentials = item ? { ...item } : { ...this.INITIAL_SMTP_CREDENTIALS };
	}

	protected handleAttachmentsOnChange(event: Event): void {
		const target = event.target as HTMLInputElement;
		const attachmentIds = this.emailForm.get('attachmentIds') as FormArray;

		if (target.checked) {
			attachmentIds.push(new FormControl(target.value));
			return;
		}

		const index = attachmentIds.controls.findIndex((control) => control.value === target.value);
		attachmentIds.removeAt(index);
	}
}
