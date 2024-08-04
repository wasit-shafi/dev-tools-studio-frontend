import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@coreServices/auth/auth.service';

import { Constants } from '@coreShared/';
import { environment } from '@environments/';
@Component({
	selector: 'app-signin',
	standalone: true,
	imports: [FormsModule],
	providers: [Constants],
	templateUrl: './signin.component.html',
	styleUrl: './signin.component.scss',
})
export class SigninComponent {
	private router = inject(Router);
	private http = inject(HttpClient);
	public constants = inject(Constants);
	private authService = inject(AuthService);

	constructor() {}

	public signinFormModel = {
		email: '',
		password: '',
	};

	handleOnSubmitSigninForm(event: any, signinForm: NgForm) {
		event.preventDefault();
		const url = `${environment.baseUrl}${this.constants.API._V1}/auth/signin`;

		this.http.post(url, { ...this.signinFormModel }).subscribe({
			next: (response) => {
				console.log('next :: response :: ', response);
				this.authService.setUserLoggedIn(true);
				this.router.navigate(['/dashboard']);
			},
			error: (error) => {
				console.log('error :: ', error);
			},
			complete: () => {
				// console.log('i am inside complete back');
			},
		});
		// signinForm.reset();
	}
}
