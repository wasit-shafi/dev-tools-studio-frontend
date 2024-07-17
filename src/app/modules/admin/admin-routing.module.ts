import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import * as AdminViews from '@adminViews/';

const routes: Routes = [
	{
		path: '',
		component: AdminViews.AdminHomeComponent,
		title: 'Welcome Admin!!',
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminRoutingModule {}
