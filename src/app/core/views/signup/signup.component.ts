import { Component, inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RecaptchaModule, RecaptchaFormsModule, RecaptchaErrorParameters, RecaptchaComponent } from 'ng-recaptcha';

import { AuthService, ToastService } from '@coreServices/';
import { Constants } from '@coreShared/';
import { CustomHttpErrorResponse } from '@coreModels/';
import { environment } from '@environments/';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'dts-signup',
	standalone: true,
	imports: [FormsModule, RouterLink, RecaptchaModule, RecaptchaFormsModule, CommonModule],
	providers: [Constants],
	templateUrl: './signup.component.html',
	styleUrl: './signup.component.scss',
})
export class SignupComponent {
	@ViewChild('reCaptcha') reCaptcha!: RecaptchaComponent;

	private readonly http = inject(HttpClient);
	public readonly constants = inject(Constants);
	private readonly toastService = inject(ToastService);
	private readonly authService = inject(AuthService);
	private readonly router = inject(Router);

	public readonly environment = environment;

	public signupFormModel = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		mobileNumber: '',
		country: '',
		reCaptchaResponse: '',
	};

	handleOnSubmitSignupForm(event: any, signupForm: NgForm) {
		event.preventDefault();

		const url = `${environment.baseUrl}${this.constants.API._V1}/auth/signup`;

		this.http.post(url, { ...this.signupFormModel }).subscribe({
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

					this.router.navigate([this.constants.ROUTES.DASHBOARD]);
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

	handleReCaptchaResolved(captchaResponse: string | null) {
		// console.log({ captchaResponse });

		// TODO: handle avoiding on reset the form, the form input values becomes null, which will trigger toast notification
		if (captchaResponse == null) {
			this.toastService.enqueueToastNotification({
				message: 'reCaptcha has expired. Please check the checkbox again.',
				type: this.constants.ALERT_TYPE.WARNING,
			});
		}
	}

	handleReCaptchaErrored(errorDetails: RecaptchaErrorParameters) {
		// console.warn(errorDetails);

		this.toastService.enqueueToastNotification({
			message: 'reCAPTCHA encounters an error(usually network connectivity). Please try again',
			type: this.constants.ALERT_TYPE.ERROR,
		});
	}
}
