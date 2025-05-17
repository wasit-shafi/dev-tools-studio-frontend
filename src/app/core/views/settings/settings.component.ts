import { Component } from '@angular/core';
import {
    AddCredentialComponent, AddEmailTemplateComponent, ListCredentialComponent, ListEmailTemplateComponent
} from '@coreComponents/';

@Component({
	selector: 'dts-settings',
	imports: [AddCredentialComponent, ListCredentialComponent, AddEmailTemplateComponent, ListEmailTemplateComponent],
	templateUrl: './settings.component.html',
	styleUrl: './settings.component.scss',
})
export class SettingsComponent {}
