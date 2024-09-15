import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { Constants } from '@coreShared/';
import { CustomHttpErrorResponse } from '@coreModels/';
import { AuthService, ToastService } from '@coreServices/';
import { environment } from '@environments/';

@Component({
	selector: 'dts-signup',
	standalone: true,
	imports: [FormsModule, RouterLink],
	providers: [Constants],
	templateUrl: './signup.component.html',
	styleUrl: './signup.component.scss',
})
export class SignupComponent {
	private http = inject(HttpClient);
	private constants = inject(Constants);
	private toastService = inject(ToastService);
	private authService = inject(AuthService);
	private router = inject(Router);

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

		const url = `${environment.baseUrl}${this.constants.API._V1}/auth/signup`;

		this.http.post(url, { ...this.signupFormDetails }).subscribe({
			next: (response: any) => {
				if (response.success && response.code === this.constants.HTTP_STATUS_CODES.SUCCESSFUL.CREATED) {
					this.authService.changeAuthStatus({
						status: true,
						accessToken: response.data.accessToken,
						refreshToken: response.data.refreshToken,
						roles: response.data.roles,
					});

					this.toastService.enqueueToastNotification({
						message: response.message,
						type: this.constants.ALERT_TYPE.SUCCESS,
					});

					this.router.navigate(['/dashboard']);
				}
			},
			error: (error: CustomHttpErrorResponse) => {
				this.toastService.enqueueToastNotification({
					message: error.error.message || error.message,
					type: this.constants.ALERT_TYPE.ERROR,
				});
			},
			complete: () => {
				// console.log('i am inside complete back');
			},
		});

		// signupForm.reset();
	}
}
