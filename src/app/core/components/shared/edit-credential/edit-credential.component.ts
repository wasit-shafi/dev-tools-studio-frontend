import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Constants } from '@app/core/shared';
import { ICredentialData } from '@app/modules/user/models';
import { userActions } from '@app/modules/user/store';
import { Store } from '@ngrx/store';

@Component({
	selector: 'dts-edit-credential',
	imports: [FormsModule],
	providers: [Constants],
	templateUrl: './edit-credential.component.html',
	styleUrl: './edit-credential.component.scss',
})
export class EditCredentialComponent {
	@ViewChild('editCredentialDialog') addCredentialDialog!: ElementRef;

	protected readonly constants = inject(Constants);
	private readonly store = inject(Store);

	private readonly INITIAL_EDIT_CREDENTIAL_FORM_MODEL: ICredentialData = {
		_id: '',
		credentialType: 0,
		displayName: '',
		emailId: '',
		host: '',
		port: 0,
		user: '',
		pass: '',
	};
	protected editCredentialFormModel: ICredentialData = {
		...this.INITIAL_EDIT_CREDENTIAL_FORM_MODEL,
	};

	protected handleOnSubmitEditCredentialForm(): void {
		const { _id, ...data } = this.editCredentialFormModel;

		this.store.dispatch(userActions.editCredential({ _id, data }));
		// TODO(Wasit): close modal only if the new credential is added successfully

		this.handleOnModalClose();
	}

	public handleOnModalOpen(credential: ICredentialData): void {
		this.editCredentialFormModel = { ...credential };
		this.addCredentialDialog.nativeElement.showModal();
	}

	protected handleOnModalClose(): void {
		this.addCredentialDialog.nativeElement.close();
		this.handleResetEditCredentialFrom();
	}

	protected handleResetEditCredentialFrom(): void {
		this.editCredentialFormModel = {
			...this.INITIAL_EDIT_CREDENTIAL_FORM_MODEL,
		};
	}
}
