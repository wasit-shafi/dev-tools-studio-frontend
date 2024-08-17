import { Routes } from '@angular/router';

import * as CoreViews from '@coreViews/';

import { Constants } from '@coreShared/';

import { authGuard, alreadySignedInGuard } from '@coreGuards/';

const constants = new Constants();

export const routes: Routes = [
	{
		path: constants.ROUTES.ROOT,
		component: CoreViews.HomeComponent,
		title: `${constants.PROJECT_NAME}`,
		pathMatch: 'full',
	},
	{
		canMatch: [alreadySignedInGuard],
		path: constants.ROUTES.SIGNUP,
		component: CoreViews.SignupComponent,
		title: `Signup - ${constants.PROJECT_NAME}`,
	},
	{
		canMatch: [alreadySignedInGuard],
		path: constants.ROUTES.SIGNIN,
		component: CoreViews.SigninComponent,
		title: `Signin - ${constants.PROJECT_NAME}`,
	},
	{
		canMatch: [alreadySignedInGuard],
		path: constants.ROUTES.RESET_PASSWORD,
		component: CoreViews.ResetPasswordComponent,
		title: `Reset Password - ${constants.PROJECT_NAME}`,
	},
	{
		path: constants.ROUTES.CONTACT,
		component: CoreViews.ContactComponent,
		title: `Contact Wasit - ${constants.PROJECT_NAME}`,
	},
	{
		canMatch: [authGuard],
		path: constants.ROUTES.DASHBOARD,
		loadChildren: () => import('./modules/user/user.module').then((module) => module.UserModule),
	},
	{
		canMatch: [authGuard],
		path: constants.ROUTES.SETTINGS,
		component: CoreViews.SettingsComponent,
		title: `Settings - ${constants.PROJECT_NAME}`,
	},
	// TODO(wasit): added admin guard as well for control panel

	{
		canMatch: [authGuard],
		path: constants.ROUTES.CONTROL_PANEL,
		loadChildren: () => import('./modules/admin/admin.module').then((module) => module.AdminModule),
	},
	{
		path: '**',
		component: CoreViews.NotFoundComponent,
		title: `Page Not Found - ${constants.PROJECT_NAME}`,
	},
];
