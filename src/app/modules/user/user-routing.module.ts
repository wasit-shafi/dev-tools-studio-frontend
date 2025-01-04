import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Constants } from '@coreShared/constants';
import * as UserViews from '@userViews/';

const constants = new Constants();

const routes: Routes = [
	{
		path: '',
		component: UserViews.DashboardComponent,
		title: `Welcome USERNAME - ${constants.PROJECT_NAME}`,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class UserRoutingModule {}
