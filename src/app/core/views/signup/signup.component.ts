import { RecaptchaComponent, RecaptchaErrorParameters, RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CustomHttpErrorResponse } from '@coreModels/';
import { AuthService, ToastService } from '@coreServices/';
import { Constants } from '@coreShared/';
import { environment } from '@environments/';

@Component({
	selector: 'dts-signup',
	imports: [FormsModule, RouterLink, RecaptchaModule, RecaptchaFormsModule, CommonModule],
	providers: [Constants],
	templateUrl: './signup.component.html',
	styleUrl: './signup.component.scss',
})
export class SignupComponent {
	@ViewChild('reCaptcha') reCaptcha!: RecaptchaComponent;

	private readonly authService = inject(AuthService);
	private readonly http = inject(HttpClient);
	private readonly router = inject(Router);
	private readonly toastService = inject(ToastService);
	protected readonly constants = inject(Constants);

	protected readonly environment = environment;

	protected readonly signupFormModel = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: '',
		countryCode: '',
		mobileNumber: '',
		country: '',
		reCaptchaResponse: '',
	};

	handleOnSubmitSignupForm(event: Event, signupForm: NgForm): void {
		event.preventDefault();

		const url = `${environment.baseUrl}${this.constants.API._V1}/auth/signup`;

		this.http.post(url, { ...this.signupFormModel }).subscribe({
			next: (response: any) => {
				if (response.success && response.code === this.constants.HTTP_STATUS_CODES.SUCCESSFUL.CREATED) {
					this.toastService.enqueueToastNotification({
						message: response.message,
						type: this.constants.ALERT_TYPE.SUCCESS,
					});

					this.router.navigate([this.constants.ROUTES.SIGNIN]);
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

	handleReCaptchaResolved(captchaResponse: string | null): void {
		// console.log({ captchaResponse });

		// TODO: handle avoiding on reset the form, the form input values becomes null, which will trigger toast notification
		if (captchaResponse == null) {
			this.toastService.enqueueToastNotification({
				message: 'reCaptcha has expired. Please check the checkbox again.',
				type: this.constants.ALERT_TYPE.WARNING,
			});
		}
	}

	handleReCaptchaErrored(errorDetails: RecaptchaErrorParameters): void {
		// console.warn(errorDetails);

		this.toastService.enqueueToastNotification({
			message: 'reCAPTCHA encounters an error(usually network connectivity). Please try again',
			type: this.constants.ALERT_TYPE.ERROR,
		});
	}
}
