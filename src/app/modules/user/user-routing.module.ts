import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import * as UserViews from '@userViews/';
import { Constants } from '@coreShared/constants/constants';

const constants = new Constants();

const routes: Routes = [
	{
		path: '',
		component: UserViews.DashboardComponent,
		title: `Welcome USERNAME - ${constants.projectName}`,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class UserRoutingModule {}
