import { Component, inject } from '@angular/core';

import { Constants } from '@coreShared/';
import { AdminComponent, MailComponent, ColorsComponent, MetaTagsComponent, OpenGraphComponent } from './tab-panels';
import { HasRoleDirective } from '@coreDirectives/has-role/has-role.directive';

@Component({
	selector: 'dts-dashboard',
	standalone: true,
	imports: [AdminComponent, MailComponent, ColorsComponent, MetaTagsComponent, OpenGraphComponent, HasRoleDirective],
	providers: [Constants],
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
	public constants = inject(Constants);
}
