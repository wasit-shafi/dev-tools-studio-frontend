import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

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
	private http = inject(HttpClient);

	constructor(public constants: Constants) {}

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
