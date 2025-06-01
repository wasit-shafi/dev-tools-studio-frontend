import { AdminComponent } from '@adminViews/';
import { Component, inject } from '@angular/core';
import { HasPermissionDirective } from '@coreDirectives/';
import { Constants } from '@coreShared/';
import { ColorsComponent, EmailComponent, MetaTagsComponent, OpenGraphComponent } from '@userViews/';

@Component({
	selector: 'dts-dashboard',
	imports: [
		EmailComponent,
		ColorsComponent,
		MetaTagsComponent,
		OpenGraphComponent,
		HasPermissionDirective,
		AdminComponent,
	],
	providers: [Constants],
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
	protected readonly constants = inject(Constants);
}
