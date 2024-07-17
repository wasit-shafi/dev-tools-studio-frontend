import { Routes } from '@angular/router';

import * as CoreViews from '@coreViews/';

export const routes: Routes = [
	// { path: '', redirectTo: 'home', pathMatch: 'full' },
	{
		path: '',
		component: CoreViews.HomeComponent,
		title: 'Signup - Dev Tools Studio',
	},
	{
		path: 'signup',
		component: CoreViews.SignupComponent,
		title: 'Signup - Dev Tools Studio',
	},
	{
		path: 'signin',
		component: CoreViews.SigninComponent,
		title: 'Signin - Dev Tools Studio',
	},
	{
		path: 'forgot-password',
		component: CoreViews.ForgotPasswordComponent,
		title: 'Forgot Password - Dev Tools Studio',
	},
	{
		path: 'user-home',
		loadChildren: () => import('./modules/user/user.module').then((module) => module.UserModule),
		title: 'Home - Dev Tools Studio',
	},
	{
		path: 'settings',
		component: CoreViews.SettingsComponent,
		title: 'Settings - Dev Tools Studio',
	},
	{
		path: 'admin-home',
		loadChildren: () => import('./modules/admin/admin.module').then((module) => module.AdminModule),
		title: 'Admin Home - Dev Tools Studio',
	},
	{
		path: '**',
		component: CoreViews.PageNotFoundComponent,
		title: 'Page Not Found',
	},
];
