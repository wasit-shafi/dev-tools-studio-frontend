import { Routes } from '@angular/router';
import { alreadySignedInGuard, authAdminGuard, authGuard } from '@coreGuards/';
import { Constants } from '@coreShared/';
import * as CoreViews from '@coreViews/';

const constants = new Constants();

export const routes: Routes = [
	// root

	{
		pathMatch: 'full',
		path: constants.ROUTES.ROOT,
		component: CoreViews.HomeComponent,
		title: `${constants.PROJECT_NAME}`,
	},
	// signup

	{
		canMatch: [alreadySignedInGuard],
		path: constants.ROUTES.SIGNUP,
		component: CoreViews.SignupComponent,
		title: `Signup - ${constants.PROJECT_NAME}`,
	},
	// signin

	{
		canMatch: [alreadySignedInGuard],
		path: constants.ROUTES.SIGNIN,
		component: CoreViews.SigninComponent,
		title: `Signin - ${constants.PROJECT_NAME}`,
	},
	// reset-password

	{
		canMatch: [alreadySignedInGuard],
		path: constants.ROUTES.RESET_PASSWORD,
		component: CoreViews.ResetPasswordComponent,
		title: `Reset Password - ${constants.PROJECT_NAME}`,
	},
	// contact

	{
		path: constants.ROUTES.CONTACT,
		component: CoreViews.ContactComponent,
		title: `Contact Wasit - ${constants.PROJECT_NAME}`,
	},
	// lazy load user module (for all the signin user)

	{
		canMatch: [authGuard],
		path: constants.ROUTES.DASHBOARD,
		loadChildren: () => import('./modules/user/user.module').then((module) => module.UserModule),
	},
	// settings

	{
		canMatch: [authGuard],
		path: constants.ROUTES.SETTINGS,
		component: CoreViews.SettingsComponent,
		title: `Settings - ${constants.PROJECT_NAME}`,
	},
	// lazy load admin module (only for admin)

	{
		canMatch: [authGuard, authAdminGuard],
		path: constants.ROUTES.CONTROL_PANEL,
		loadChildren: () => import('./modules/admin/admin.module').then((module) => module.AdminModule),
	},
	// ** (404 not found fallback)

	{
		path: '**',
		component: CoreViews.NotFoundComponent,
		title: `Page Not Found - ${constants.PROJECT_NAME}`,
	},
];
