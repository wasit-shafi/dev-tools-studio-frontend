import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import * as AdminViews from '@adminViews/';
import { Constants } from '@coreShared/constants/constants';

const constants = new Constants();

const routes: Routes = [
	{
		path: '',
		component: AdminViews.ControlPanelComponent,
		title: `Welcome Admin USERNAME - ${constants.projectName}`,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminRoutingModule {}
