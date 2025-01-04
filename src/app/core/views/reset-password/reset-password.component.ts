import { RecaptchaComponent, RecaptchaErrorParameters, RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';

import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToastService } from '@coreServices/';
import { Constants } from '@coreShared/';
import { authActions } from '@coreStore/';
import { environment } from '@environments/';
import { Store } from '@ngrx/store';

@Component({
	selector: 'dts-reset-password',
	imports: [FormsModule, RouterLink, RecaptchaModule, RecaptchaFormsModule, CommonModule],
	providers: [Constants],
	templateUrl: './reset-password.component.html',
	styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent implements OnInit {
	@ViewChild('reCaptcha') reCaptcha!: RecaptchaComponent;

	private readonly store = inject(Store);
	private readonly toastService = inject(ToastService);
	protected readonly constants = inject(Constants);
	protected readonly environment = environment;
	protected readonly activatedRoute = inject(ActivatedRoute);

	protected token: string = '';
	protected resetPasswordFormModel = {
		password: '',
		confirmPassword: '',
		reCaptchaResponse: '',
	};

	ngOnInit(): void {
		this.activatedRoute.queryParamMap.subscribe({
			next: (params) => {
				this.token = params.get('token') ?? '';
			},
		});
	}

	handleOnSubmitResetPasswordForm(event: Event, resetPasswordForm: NgForm): void {
		event.preventDefault();
		this.store.dispatch(authActions.resetPassword({ ...resetPasswordForm.value, token: this.token }));

		// resetPasswordForm.reset();
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

	resetReCaptcha(): void {
		this.reCaptcha.reset();
	}

	handleReCaptchaErrored(errorDetails: RecaptchaErrorParameters): void {
		this.toastService.enqueueToastNotification({
			message: 'reCAPTCHA encounters an error(usually network connectivity). Please try again',
			type: this.constants.ALERT_TYPE.ERROR,
		});
	}
}
