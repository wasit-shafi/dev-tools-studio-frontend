import { Routes } from '@angular/router';

import { SignupComponent, HomeComponent } from '@views';

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'signup', component: SignupComponent },
];
