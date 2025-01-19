import { RecaptchaComponent, RecaptchaErrorParameters, RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';

import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToastService } from '@coreServices/';
import { Constants } from '@coreShared/';
import { authActions } from '@coreStore/';
import { Notifications } from '@coreUtils/';
import { environment } from '@environments/';
import { Store } from '@ngrx/store';

@Component({
	selector: 'dts-reset-password',
	imports: [FormsModule, RouterLink, RecaptchaModule, RecaptchaFormsModule, CommonModule],
	providers: [Constants, Notifications],
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
	protected readonly notifications = inject(Notifications);

	protected token: string = '';
	protected isConfirmPasswordVisible: boolean = false;

	protected readonly resetPasswordFormModel = {
		password: '',
		confirmPassword: '',
		reCaptcha: '',
	};

	ngOnInit(): void {
		this.activatedRoute.queryParamMap.subscribe({
			next: (params) => {
				this.token = params.get('token') ?? '';
			},
		});
	}

	protected handleOnSubmitResetPasswordForm(event: Event, resetPasswordForm: NgForm): void {
		event.preventDefault();
		this.store.dispatch(authActions.resetPassword({ ...resetPasswordForm.value, token: this.token }));

		// resetPasswordForm.reset();
	}

	protected handleReCaptchaResolved(captchaResponse: string | null): void {
		// console.log({ captchaResponse });

		// TODO: handle avoiding on reset the form, the form input values becomes null, which will trigger toast notification

		if (captchaResponse == null) {
			this.toastService.enqueueToastNotification({
				message: this.notifications.alerts.shared.recaptchaExpired,
				type: this.constants.ALERT_TYPE.WARNING,
			});
		}
	}

	protected resetReCaptcha(): void {
		this.reCaptcha.reset();
	}

	protected handleReCaptchaErrored(errorDetails: RecaptchaErrorParameters): void {
		this.toastService.enqueueToastNotification({
			message: this.notifications.alerts.shared.recaptchaError,
			type: this.constants.ALERT_TYPE.ERROR,
		});
	}
}
