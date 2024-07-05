import { Routes } from '@angular/router';

import { SignupComponent, HomeComponent, SigninComponent, ForgotPasswordComponent, GuestComponent } from '@views/';
import { SettingsComponent } from '@views/settings/settings.component';
import { AdminHomeComponent } from './module/components/admin/admin-home/admin-home.component';
import { PageNotFoundComponent } from '@views/page-not-found/page-not-found.component';

export const routes: Routes = [
	// { path: '', redirectTo: 'home', pathMatch: 'full' },
	{
		path: '',
		component: HomeComponent,
		title: 'Signup - Dev Tools Studio',
	},
	{
		path: 'signup',
		component: SignupComponent,
		title: 'Signup - Dev Tools Studio',
	},
	{
		path: 'signin',
		component: SigninComponent,
		title: 'Signin - Dev Tools Studio',
	},
	{
		path: 'forgot-password',
		component: ForgotPasswordComponent,
		title: 'Forgot Password - Dev Tools Studio',
	},
	{
		path: 'home',
		component: HomeComponent,
		title: 'Home - Dev Tools Studio',
	},
	{
		path: 'guest',
		component: GuestComponent,
		title: 'Guest - Dev Tools Studio',
	},
	{
		path: 'settings',
		component: SettingsComponent,
		title: 'Settings - Dev Tools Studio',
	},
	// TODO: lazy load admin module/component
	{
		path: 'admin-home',
		component: AdminHomeComponent,
		title: 'Admin Home - Dev Tools Studio',
	},
	{
		path: '**',
		component: PageNotFoundComponent,
		title: 'Page Not Found',
	},
];
