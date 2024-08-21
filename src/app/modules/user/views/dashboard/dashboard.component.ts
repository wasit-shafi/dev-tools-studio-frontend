import { Component } from '@angular/core';

import { Constants } from '@coreShared/';
import { AdminComponent, MailComponent, ColorsComponent, MetaTagsComponent, OpenGraphComponent } from './tab-panels';

@Component({
	selector: 'app-dashboard',
	standalone: true,
	imports: [AdminComponent, MailComponent, ColorsComponent, MetaTagsComponent, OpenGraphComponent],
	providers: [Constants],
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
