import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import * as UserViews from '@userViews/';

const routes: Routes = [
	{
		path: '',
		component: UserViews.UserHomeComponent,
		title: 'Welcome User!!',
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class UserRoutingModule {}
