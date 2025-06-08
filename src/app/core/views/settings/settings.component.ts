import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
	AddAttachmentComponent,
	AddCredentialComponent,
	AddEmailTemplateComponent,
	ListAttachmentComponent,
	ListCredentialComponent,
	ListEmailTemplateComponent,
} from '@coreComponents/';
import { Constants, Utils } from '@coreShared/';
import { authActions, authFeature } from '@coreStore/';
import { Store } from '@ngrx/store';

@Component({
	selector: 'dts-settings',
	imports: [
		AddCredentialComponent,
		ListCredentialComponent,
		AddEmailTemplateComponent,
		ListEmailTemplateComponent,
		AsyncPipe,
		AddAttachmentComponent,
		ListAttachmentComponent,
	],
	providers: [Utils],
	templateUrl: './settings.component.html',
	styleUrl: './settings.component.scss',
})
export class SettingsComponent {
	private readonly store = inject(Store);
	protected readonly utils = inject(Utils);
	protected readonly constants = inject(Constants);

	protected currentUser$ = this.store.select(authFeature.selectCurrentUser);

	protected handleUploadProfilePicture(event: Event): void {
		const target = event.target as HTMLInputElement;

		if (target?.files?.length) {
			const formData = new FormData();

			formData.append('profilePicture', target.files[0]);
			this.store.dispatch(authActions.profilePicture({ formData }));
		}
	}
}
