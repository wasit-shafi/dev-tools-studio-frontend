import { RecaptchaComponent, RecaptchaErrorParameters, RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';

import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ISignupData } from '@coreModels/';
import { AuthService, ToastService } from '@coreServices/';
import { Constants } from '@coreShared/';
import { authActions } from '@coreStore/';
import { Notifications } from '@coreUtils/';
import { environment } from '@environments/';
import { Store } from '@ngrx/store';

@Component({
	selector: 'dts-signup',
	imports: [FormsModule, RouterLink, RecaptchaModule, RecaptchaFormsModule, CommonModule, NgOptimizedImage],
	providers: [Constants, Notifications],
	templateUrl: './signup.component.html',
	styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
	@ViewChild('reCaptcha') reCaptcha!: RecaptchaComponent;

	private readonly authService = inject(AuthService);
	private readonly router = inject(Router);
	private readonly store = inject(Store);
	private readonly toastService = inject(ToastService);
	protected readonly constants = inject(Constants);
	protected readonly notifications = inject(Notifications);

	protected readonly environment = environment;

	protected isConfirmPasswordVisible: boolean = false;

	protected readonly signupFormModel: ISignupData = {
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

	ngOnInit(): void {
		this.authService.handleRegisterCallbackOnSignupFailed(this.resetReCaptcha.bind(this));
	}

	protected resetReCaptcha(): void {
		this.reCaptcha.reset();
	}

	protected handleOnSubmitSignupForm(event: Event): void {
		event.preventDefault();

		this.store.dispatch(authActions.signup(this.signupFormModel));
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
