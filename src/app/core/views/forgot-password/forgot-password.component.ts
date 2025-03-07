import { RecaptchaComponent, RecaptchaErrorParameters, RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { combineLatest } from 'rxjs';

import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastService } from '@coreServices/';
import { Constants } from '@coreShared/';
import { authActions, authFeature } from '@coreStore/';
import { Notifications } from '@coreUtils/';
import { environment } from '@environments/';
import { Store } from '@ngrx/store';

@Component({
	selector: 'dts-forgot-password',
	imports: [FormsModule, RouterLink, RecaptchaModule, RecaptchaFormsModule, CommonModule, NgOptimizedImage],
	providers: [Constants, Notifications],
	templateUrl: './forgot-password.component.html',
	styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
	@ViewChild('reCaptcha') reCaptcha!: RecaptchaComponent;

	private readonly store = inject(Store);
	private readonly toastService = inject(ToastService);
	protected readonly constants = inject(Constants);
	protected readonly notifications = inject(Notifications);

	protected readonly environment = environment;

	protected readonly forgotPasswordFormModel = {
		email: '',
		reCaptcha: '',
	};

	protected readonly data$ = combineLatest({
		forgotPasswordUi: this.store.select(authFeature.selectForgotPasswordUi),
	});

	handleOnSubmitForgotPasswordForm(event: Event, forgotPasswordForm: NgForm): void {
		event.preventDefault();
		this.store.dispatch(authActions.forgotPassword({ ...forgotPasswordForm.value }));
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
