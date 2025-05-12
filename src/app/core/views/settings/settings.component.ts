import { Component } from '@angular/core';
import { AddCredentialComponent, ListCredentialComponent } from '@app/core/components';

@Component({
	selector: 'dts-settings',
	imports: [AddCredentialComponent, ListCredentialComponent],
	templateUrl: './settings.component.html',
	styleUrl: './settings.component.scss',
})
export class SettingsComponent {}
