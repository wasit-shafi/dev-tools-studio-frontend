import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

import { Constants } from '@coreShared/';
import { environment } from '@environments/';
import { AuthService } from '@coreServices/';

// TODO: update the interface logic to a single file

interface ISignin {
	code: number;
	data: Data;
	message: string;
	success: boolean;
}
interface Data {
	id: string;
	accessToken: string;
	refreshToken: string;
}
@Component({
	selector: 'app-signin',
	standalone: true,
	imports: [FormsModule, RouterLink],
	providers: [Constants],
	templateUrl: './signin.component.html',
	styleUrl: './signin.component.scss',
})
export class SigninComponent {
	private router = inject(Router);
	private http = inject(HttpClient);
	public constants = inject(Constants);
	private authService = inject(AuthService);

	public signinFormModel = {
		email: '',
		password: '',
	};

	postSignin(url: string, data: any): Observable<ISignin> {
		return this.http.post<ISignin>(url, data);
	}

	handleOnSubmitSigninForm(event: any, signinForm: NgForm) {
		event.preventDefault();
		const url = `${environment.baseUrl}${this.constants.API._V1}/auth/signin`;

		this.postSignin(url, { ...this.signinFormModel }).subscribe({
			next: (response) => {
				console.log('next :: response :: ', response);
				this.authService.setUserSignedIn = true;
				this.authService.setAuthTokens = {
					accessToken: response.data.accessToken,
					refreshToken: response.data.refreshToken,
				};

				this.router.navigate(['/dashboard']);
			},
			error: (error: HttpErrorResponse) => {
				console.log('error :: ', error);
			},
			complete: () => {
				// console.log('i am inside complete back');
			},
		});
		// signinForm.reset();
	}
}
