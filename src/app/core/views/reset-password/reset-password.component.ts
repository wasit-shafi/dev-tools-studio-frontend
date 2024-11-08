import { RecaptchaComponent, RecaptchaErrorParameters, RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';

import { HttpClient } from '@angular/common/http';
import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastService } from '@coreServices/index';
import { Constants } from '@coreShared/';
import { environment } from '@environments/';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'dts-reset-password',
	standalone: true,
	imports: [FormsModule, RouterLink, RecaptchaModule, RecaptchaFormsModule, CommonModule],
	providers: [Constants],
	templateUrl: './reset-password.component.html',
	styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
	@ViewChild('reCaptcha') reCaptcha!: RecaptchaComponent;

	private readonly store = inject(Store);
	private readonly toastService = inject(ToastService);
	public readonly constants = inject(Constants);
	public readonly environment = environment;

	public resetPasswordFormModel = {
		email: '',
		otp: '',
		reCaptchaResponse: '',
	};

	handleOnSubmitResetPasswordForm(event: any, resetPasswordForm: NgForm) {

		event.preventDefault();

		resetPasswordForm.reset();
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

	resetReCaptcha(): void {
		this.reCaptcha.reset();
	}

	handleReCaptchaErrored(errorDetails: RecaptchaErrorParameters) {
		this.toastService.enqueueToastNotification({
			message: 'reCAPTCHA encounters an error(usually network connectivity). Please try again',
			type: this.constants.ALERT_TYPE.ERROR,
		});
	}
}
