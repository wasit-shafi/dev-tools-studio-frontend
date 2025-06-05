import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
    AddAttachmentComponent, AddCredentialComponent, AddEmailTemplateComponent, ListAttachmentComponent,
    ListCredentialComponent, ListEmailTemplateComponent
} from '@coreComponents/';
import { Utils } from '@coreShared/';
import { authFeature } from '@coreStore/';
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
	protected currentUser$ = this.store.select(authFeature.selectCurrentUser);
}
