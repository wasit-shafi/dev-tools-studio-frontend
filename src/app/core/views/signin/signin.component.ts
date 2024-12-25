import { RecaptchaComponent, RecaptchaErrorParameters, RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';

import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, ToastService } from '@coreServices/';
import { Constants } from '@coreShared/';
import { authActions, authFeature } from '@coreStore/';
import { environment } from '@environments/';
import { Store } from '@ngrx/store';

@Component({
	selector: 'dts-signin',
	imports: [FormsModule, RouterLink, RecaptchaModule, RecaptchaFormsModule, CommonModule],
	providers: [Constants],
	templateUrl: './signin.component.html',
	styleUrl: './signin.component.scss',
})
export class SigninComponent {
	@ViewChild('reCaptcha') reCaptcha!: RecaptchaComponent;

	private readonly authService = inject(AuthService);
	private readonly router = inject(Router);
	private readonly store = inject(Store);
	private readonly toastService = inject(ToastService);
	protected readonly constants = inject(Constants);

	protected readonly environment = environment;

	protected authState$ = this.store.select(authFeature.selectAuthState);

	constructor() {}

	ngOnInit() {
		this.authService.handleRegisterCallbackOnSigninFailed(this.resetReCaptcha.bind(this));
	}

	protected signinFormModel = {
		email: '',
		password: '',
		reCaptchaResponse: '',
	};

	protected count!: number;

	handleOnSubmitSigninForm(event: Event, signinForm: NgForm) {
		event.preventDefault();

		this.store.dispatch(
			authActions.signin({
				email: this.signinFormModel.email,
				password: this.signinFormModel.password,
				reCaptchaResponse: this.signinFormModel.reCaptchaResponse,
			})
		);
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
		// console.log({errorDetails})
		this.toastService.enqueueToastNotification({
			message: 'reCAPTCHA encounters an error(usually network connectivity). Please try again',
			type: this.constants.ALERT_TYPE.ERROR,
		});
	}
}
