import { Component, inject } from '@angular/core';
import { HasRoleDirective } from '@coreDirectives/has-role/has-role.directive';
import { Constants } from '@coreShared/';

import {
    AdminComponent, ColorsComponent, MailComponent, MetaTagsComponent, OpenGraphComponent
} from './tab-panels';

@Component({
	selector: 'dts-dashboard',
	standalone: true,
	imports: [AdminComponent, MailComponent, ColorsComponent, MetaTagsComponent, OpenGraphComponent, HasRoleDirective],
	providers: [Constants],
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
	public readonly constants = inject(Constants);
}
