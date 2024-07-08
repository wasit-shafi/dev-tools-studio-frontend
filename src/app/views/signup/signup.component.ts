import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { Constants } from '@shared/';
import { environment } from '@environments/';

@Component({
	selector: 'app-signup',
	standalone: true,
	imports: [FormsModule],
	providers: [Constants],
	templateUrl: './signup.component.html',
	styleUrl: './signup.component.scss',
})
export class SignupComponent {
	private http = inject(HttpClient);

	constructor(public constants: Constants) {}
	public signupFormDetails = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		mobileNumber: '',
		country: '',
	};

	handleOnSubmitSignupForm(event: any, signupForm: NgForm) {
		event.preventDefault();

		const url = `${environment.baseUrl}${this.constants.API._V1}/user/register`;

		this.http.post(url, { ...this.signupFormDetails }).subscribe({
			next: (response) => {},
			error: (error) => {
				console.log('error :: ', error);
			},
		});

		signupForm.reset();
	}
}
