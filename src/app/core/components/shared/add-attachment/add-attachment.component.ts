import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Constants } from '@coreShared/';
import { Store } from '@ngrx/store';
import { userActions } from '@userStore/';

@Component({
	selector: 'dts-add-attachment',
	imports: [FormsModule, CommonModule],
	providers: [Constants],
	templateUrl: './add-attachment.component.html',
	styleUrl: './add-attachment.component.scss',
})
export class AddAttachmentComponent {
	@ViewChild('addAttachmentDialog') addAttachmentDialog!: ElementRef;

	protected readonly constants = inject(Constants);
	private readonly store = inject(Store);

	protected readonly allowedMimeForAttachment = [
		...this.constants.ALLOWED_MIME_TYPES.IMAGES,
		...this.constants.ALLOWED_MIME_TYPES.VIDEOS,
		...this.constants.ALLOWED_MIME_TYPES.TEXT,
		...this.constants.ALLOWED_MIME_TYPES.AUDIO,
		...this.constants.ALLOWED_MIME_TYPES.DOCUMENTS,
	];

	private attachmentFile!: File;
	private readonly INITIAL_ADD_ATTACHMENT_FORM_MODEL: { attachmentName: string; attachment: File | null } = {
		attachmentName: '',
		attachment: null,
	};
	protected addAttachmentFormModel: { attachmentName: string; attachment: File | null } = {
		...this.INITIAL_ADD_ATTACHMENT_FORM_MODEL,
	};

	protected onFileSelected(event: Event): void {
		const target = event.target as HTMLInputElement;

		if (target?.files?.length) {
			this.attachmentFile = target.files[0];
		}
	}

	protected handleOnSubmitAddAttachmentForm(): void {
		if (this.addAttachmentFormModel.attachment) {
			const formData = new FormData();

			formData.append('attachment', this.attachmentFile);
			formData.append('attachmentName', this.addAttachmentFormModel.attachmentName);

			this.store.dispatch(userActions.addAttachment({ formData }));

			// TODO(Wasit): close modal only if the new attachment is added successfully
			this.handleOnModalClose();
		}
	}

	protected handleOnModalOpen(): void {
		this.addAttachmentDialog.nativeElement.showModal();
	}

	protected handleOnModalClose(): void {
		this.addAttachmentDialog.nativeElement.close();
		this.handleResetAddAttachmentFrom();
	}

	protected handleResetAddAttachmentFrom(): void {
		this.addAttachmentFormModel = {
			...this.INITIAL_ADD_ATTACHMENT_FORM_MODEL,
		};
	}
}
