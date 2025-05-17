import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Constants } from '@coreShared/';
import { Store } from '@ngrx/store';
import { IAddEmailTemplate } from '@userModels/';
import { userActions } from '@userStore/';

@Component({
	selector: 'dts-add-email-template',
	imports: [FormsModule],
	templateUrl: './add-email-template.component.html',
	styleUrl: './add-email-template.component.scss',
})
export class AddEmailTemplateComponent {
	@ViewChild('addEmailTemplateDialog') addEmailTemplateDialog!: ElementRef;

	protected readonly constants = inject(Constants);
	private readonly store = inject(Store);

	private readonly INITIAL_ADD_CREDENTIAL_FORM_MODEL: IAddEmailTemplate = {
		templateName: '',
		subject: '',
		salutation: '',
		body: '',
		closing: '',
		signature: '',
		tags: ['#sample-tag1', '#sample-tag2'],
	};
	protected addEmailTemplateFormModel: IAddEmailTemplate = {
		...this.INITIAL_ADD_CREDENTIAL_FORM_MODEL,
	};

	protected handleOnSubmitAddEmailTemplateForm(event: Event): void {
		this.store.dispatch(userActions.addEmailTemplate(this.addEmailTemplateFormModel));

		// TODO(Wasit): close modal only if the new email template is added successfully

		this.handleOnModalClose();
	}

	protected handleOnModalOpen(): void {
		this.addEmailTemplateDialog.nativeElement.showModal();
	}

	protected handleOnModalClose(): void {
		this.addEmailTemplateDialog.nativeElement.close();
		this.handleResetAddCredentialFrom();
	}

	protected handleResetAddCredentialFrom(): void {
		this.addEmailTemplateFormModel = {
			...this.INITIAL_ADD_CREDENTIAL_FORM_MODEL,
		};
	}
}
