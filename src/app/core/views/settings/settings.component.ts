import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
    AddCredentialComponent, AddEmailTemplateComponent, ListCredentialComponent, ListEmailTemplateComponent
} from '@coreComponents/';
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
	],
	templateUrl: './settings.component.html',
	styleUrl: './settings.component.scss',
})
export class SettingsComponent {
	private readonly store = inject(Store);
	protected currentUser$ = this.store.select(authFeature.selectCurrentUser);
}
