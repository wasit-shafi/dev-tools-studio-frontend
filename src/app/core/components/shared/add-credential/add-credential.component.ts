import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastService } from '@coreServices/';
import { Constants } from '@coreShared/';
import { Notifications } from '@coreUtils/';
import { Store } from '@ngrx/store';
import { IAddCredential } from '@userModels/';
import { UserService } from '@userServices/';
import { userActions } from '@userStore/user';

@Component({
	selector: 'dts-add-credential',
	imports: [FormsModule, CommonModule],
	providers: [Constants, Notifications],
	templateUrl: './add-credential.component.html',
	styleUrl: './add-credential.component.scss',
})
export class AddCredentialComponent {
	@ViewChild('credentialDialog') credentialDialog!: ElementRef;
	// private readonly store = inject(Store);
	private readonly toastService = inject(ToastService);
	protected readonly constants = inject(Constants);
	protected readonly notifications = inject(Notifications);
	protected readonly userService = inject(UserService);
	private readonly store = inject(Store);

	private readonly INITIAL_CREDENTIAL_FORM_MODEL = {
		credentialType: 0,
		emailId: '',
		host: '',
		port: 0,
		user: '',
		pass: '',
	};
	protected credentialFormModel: IAddCredential = {
		...this.INITIAL_CREDENTIAL_FORM_MODEL,
	};

	handleOnSubmitCredentialForm(event: Event, credentialForm: NgForm) {
		this.store.dispatch(userActions.addCredential(this.credentialFormModel));
		// TODO(Wasit): close modal only if the new credential is added successfully

		this.handleOnModalClose();
	}

	handleOnModalOpen() {
		this.credentialDialog.nativeElement.showModal();
	}

	handleOnModalClose() {
		this.credentialDialog.nativeElement.close();
		this.credentialFormModel = {
			...this.INITIAL_CREDENTIAL_FORM_MODEL,
		};
	}
}
