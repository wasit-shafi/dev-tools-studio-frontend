import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private isUserLoggedIn: boolean = false;

	public get getUserLoggedIn(): boolean {
		return this.isUserLoggedIn;
	}
	// TODO: review why setter function is causing problems here

	public setUserLoggedIn(loggedIn: any) {
		this.isUserLoggedIn = loggedIn;
	}
}
