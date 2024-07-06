import { Routes } from '@angular/router';

import * as CoreViews from '@views/';
import * as AdminViews from '@adminViews/';

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
		path: 'home',
		component: CoreViews.HomeComponent,
		title: 'Home - Dev Tools Studio',
	},
	{
		path: 'guest',
		component: CoreViews.GuestComponent,
		title: 'Guest - Dev Tools Studio',
	},
	{
		path: 'settings',
		component: CoreViews.SettingsComponent,
		title: 'Settings - Dev Tools Studio',
	},
	// TODO: lazy load admin module/component
	{
		path: 'admin-home',
		component: AdminViews.AdminHomeComponent,
		title: 'Admin Home - Dev Tools Studio',
	},
	{
		path: '**',
		component: CoreViews.PageNotFoundComponent,
		title: 'Page Not Found',
	},
];
