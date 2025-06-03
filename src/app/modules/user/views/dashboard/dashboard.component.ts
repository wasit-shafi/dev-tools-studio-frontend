import { AdminComponent } from '@adminViews/';
import { Component, inject } from '@angular/core';
import { HasPermissionDirective } from '@coreDirectives/';
import { Constants } from '@coreShared/';
// TODO(wasit): review problem when importing via alias
import { EmailComponent } from './tab-panels/email/email.component';
import { ColorsComponent } from './tab-panels/colors/colors.component';
import { MetaTagsComponent } from './tab-panels/meta-tags/meta-tags.component';
import { OpenGraphComponent } from './tab-panels/open-graph/open-graph.component';

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
