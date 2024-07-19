import { Routes } from '@angular/router';

import * as CoreViews from '@coreViews/';
import { Constants } from '@coreShared/constants/constants';

const constants = new Constants();

export const routes: Routes = [
	{
		path: constants.ROUTES.ROOT,
		component: CoreViews.HomeComponent,
		title: `Signup - ${constants.projectName}`,
	},
	{
		path: constants.ROUTES.SIGNUP,
		component: CoreViews.SignupComponent,
		title: `Signup - ${constants.projectName}`,
	},
	{
		path: constants.ROUTES.SIGNIN,
		component: CoreViews.SigninComponent,
		title: `Signin - ${constants.projectName}`,
	},
	{
		path: constants.ROUTES.RESET_PASSWORD,
		component: CoreViews.ResetPasswordComponent,
		title: `Reset Password - ${constants.projectName}`,
	},
	{
		path: constants.ROUTES.CONTACT,
		component: CoreViews.ContactComponent,
		title: `Contact Wasit - ${constants.projectName}`,
	},
	{
		path: constants.ROUTES.DASHBOARD,
		loadChildren: () => import('./modules/user/user.module').then((module) => module.UserModule),
	},
	{
		path: constants.ROUTES.SETTINGS,
		component: CoreViews.SettingsComponent,
		title: `Settings - ${constants.projectName}`,
	},
	{
		path: constants.ROUTES.CONTROL_PANEL,
		loadChildren: () => import('./modules/admin/admin.module').then((module) => module.AdminModule),
	},
	{
		path: '**',
		component: CoreViews.NotFoundComponent,
		title: `Page Not Found - ${constants.projectName}`,
	},
];
