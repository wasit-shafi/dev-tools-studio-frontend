import { RecaptchaComponent, RecaptchaErrorParameters, RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';

import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CustomHttpErrorResponse } from '@coreModels/';
import { AuthService, ToastService } from '@coreServices/';
import { Constants } from '@coreShared/';
import { Notifications } from '@coreUtils/';
import { environment } from '@environments/';

@Component({
	selector: 'dts-signup',
	imports: [FormsModule, RouterLink, RecaptchaModule, RecaptchaFormsModule, CommonModule, NgOptimizedImage],
	providers: [Constants, Notifications],
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
	protected readonly notifications = inject(Notifications);

	protected readonly environment = environment;

	protected isConfirmPasswordVisible: boolean = false;

	protected readonly signupFormModel = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: '',
		countryCode: '',
		mobileNumber: '',
		country: '',
		reCaptcha: '',
	};

	handleOnSubmitSignupForm(event: Event, signupForm: NgForm): void {
		event.preventDefault();

		const url = `${environment.baseUrl}${this.constants.API._V1}/auth/signup`;

		this.http.post(url, { ...this.signupFormModel }).subscribe({
			next: (response: any) => {
				if (response.success && response.code === this.constants.HTTP_STATUS_CODES.SUCCESSFUL.CREATED) {
					this.toastService.enqueueToastNotification({
						message: response.message,
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
			complete: () => {},
		});

		// signupForm.reset();
	}

	handleReCaptchaResolved(captchaResponse: string | null): void {
		// console.log({ captchaResponse });

		// TODO: handle avoiding on reset the form, the form input values becomes null, which will trigger toast notification

		if (captchaResponse == null) {
			this.toastService.enqueueToastNotification({
				message: this.notifications.alerts.shared.recaptchaExpired,
				type: this.constants.ALERT_TYPE.WARNING,
			});
		}
	}

	handleReCaptchaErrored(errorDetails: RecaptchaErrorParameters): void {
		// console.warn(errorDetails);

		this.toastService.enqueueToastNotification({
			message: this.notifications.alerts.shared.recaptchaError,
			type: this.constants.ALERT_TYPE.ERROR,
		});
	}
}
