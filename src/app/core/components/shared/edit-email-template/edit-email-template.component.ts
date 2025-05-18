import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Constants } from '@coreShared/';
import { Store } from '@ngrx/store';
import { IEmailTemplateData } from '@userModels/';
import { userActions } from '@userStore/';

@Component({
	selector: 'dts-edit-email-template',
	imports: [FormsModule, CommonModule],
	providers: [],
	templateUrl: './edit-email-template.component.html',
	styleUrl: './edit-email-template.component.scss',
})
export class EditEmailTemplateComponent {
	@ViewChild('editEmailTemplateDialog') editEmailTemplateDialog!: ElementRef;

	protected readonly constants = inject(Constants);
	private readonly store = inject(Store);
	private readonly INITIAL_EDIT_EMAIL_TEMPLATE_FORM_MODEL: IEmailTemplateData = {
		_id: '',
		templateName: '',
		subject: '',
		salutation: '',
		body: '',
		closing: '',
		signature: '',
		tags: ['#sample-tag1', '#sample-tag2'],
	};

	protected editEmailTemplateFormModel: IEmailTemplateData = {
		...this.INITIAL_EDIT_EMAIL_TEMPLATE_FORM_MODEL,
	};
	protected handleOnSubmitEditEmailTemplateForm(): void {
		const { _id, ...data } = this.editEmailTemplateFormModel;

		this.store.dispatch(userActions.editEmailTemplate({ _id, data }));

		console.log('edit email template :: ', { _id, data });
		// TODO(Wasit): close modal only if the new EmailTemplate is added successfully

		this.handleOnModalClose();
	}

	public handleOnModalOpen(EmailTemplate: IEmailTemplateData): void {
		this.editEmailTemplateFormModel = { ...EmailTemplate };
		this.editEmailTemplateDialog.nativeElement.showModal();
	}

	protected handleOnModalClose(): void {
		this.editEmailTemplateDialog.nativeElement.close();
		this.handleResetEditEmailTemplateFrom();
	}

	protected handleResetEditEmailTemplateFrom(): void {
		this.editEmailTemplateFormModel = {
			...this.INITIAL_EDIT_EMAIL_TEMPLATE_FORM_MODEL,
		};
	}
}
