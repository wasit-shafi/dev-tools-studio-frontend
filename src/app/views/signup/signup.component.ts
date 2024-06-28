import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { constants } from '@shared/constants';
import { environment } from '@environments';

@Component({
	selector: 'app-signup',
	standalone: true,
	imports: [FormsModule],
	templateUrl: './signup.component.html',
	styleUrl: './signup.component.scss',
})
export class SignupComponent {
	private http = inject(HttpClient);

	constructor() {}
	public signupFormDetails = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		mobileNumber: '',
		country: '',
	};

	handleOnSubmitSignupForm(event: any, signupForm: any) {
		event.preventDefault();

		const url = `${environment.baseUrl}${constants.api._V1}/user/register`;

		this.http.post(url, { ...this.signupFormDetails }).subscribe({
			next: (response) => {
				console.log('response :: ', response);
			},
			error: (error) => {
				console.log('error :: ', error);
			},
		});

		signupForm.reset();
	}
}
