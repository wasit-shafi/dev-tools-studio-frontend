import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Constants } from '@coreShared/';
import { Store } from '@ngrx/store';
import { IAddCredential } from '@userModels/';
import { userActions } from '@userStore/user';

@Component({
	selector: 'dts-add-credential',
	imports: [FormsModule, CommonModule],
	providers: [Constants],
	templateUrl: './add-credential.component.html',
	styleUrl: './add-credential.component.scss',
})
export class AddCredentialComponent {
	@ViewChild('addCredentialDialog') addCredentialDialog!: ElementRef;

	protected readonly constants = inject(Constants);
	private readonly store = inject(Store);

	private readonly INITIAL_ADD_CREDENTIAL_FORM_MODEL: IAddCredential = {
		credentialType: 0,
		displayName: '',
		emailId: '',
		host: '',
		port: 0,
		user: '',
		pass: '',
	};
	protected addCredentialFormModel: IAddCredential = {
		...this.INITIAL_ADD_CREDENTIAL_FORM_MODEL,
	};

	protected handleOnSubmitAddCredentialForm(event: Event): void {
		this.store.dispatch(userActions.addCredential(this.addCredentialFormModel));
		// TODO(Wasit): close modal only if the new credential is added successfully

		this.handleOnModalClose();
	}

	protected handleOnModalOpen(): void {
		this.addCredentialDialog.nativeElement.showModal();
	}

	protected handleOnModalClose(): void {
		this.addCredentialDialog.nativeElement.close();
		this.handleResetAddCredentialFrom();
	}

	protected handleResetAddCredentialFrom(): void {
		this.addCredentialFormModel = {
			...this.INITIAL_ADD_CREDENTIAL_FORM_MODEL,
		};
	}
}
