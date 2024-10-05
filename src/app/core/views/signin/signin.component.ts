import { HttpClient } from '@angular/common/http';
import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecaptchaModule, RecaptchaFormsModule, RecaptchaErrorParameters, RecaptchaComponent } from 'ng-recaptcha';

import { AuthService, ToastService } from '@coreServices/';
import { Constants } from '@coreShared/';
import { CustomHttpErrorResponse } from '@coreModels/';
import { environment } from '@environments/';

interface Data {
	id: string;
	accessToken: string;
	refreshToken: string;
	roles: number[];
}
// TODO: update the interface logic to a single file

interface ISignin {
	code: number;
	data: Data;
	message: string;
	success: boolean;
}
@Component({
	selector: 'dts-signin',
	standalone: true,
	imports: [FormsModule, RouterLink, RecaptchaModule, RecaptchaFormsModule, CommonModule],
	providers: [Constants],
	templateUrl: './signin.component.html',
	styleUrl: './signin.component.scss',
})
export class SigninComponent {
	@ViewChild('reCaptcha') reCaptcha!: RecaptchaComponent;

	private readonly router = inject(Router);
	private readonly http = inject(HttpClient);
	public readonly constants = inject(Constants);
	private readonly authService = inject(AuthService);
	private readonly toastService = inject(ToastService);
	public readonly environment = environment;

	constructor() {}

	public signinFormModel = {
		email: '',
		password: '',
		reCaptchaResponse: '',
	};

	postSignin(url: string, data: any): Observable<ISignin> {
		return this.http.post<ISignin>(url, data);
	}

	handleOnSubmitSigninForm(event: any, signinForm: NgForm) {
		event.preventDefault();
		const url = `${environment.baseUrl}${this.constants.API._V1}/auth/signin`;

		this.postSignin(url, { ...this.signinFormModel }).subscribe({
			next: (response) => {
				console.log('next :: response :: ', response);
				this.authService.changeAuthStatus({
					status: true,
					accessToken: response.data.accessToken,
					refreshToken: response.data.refreshToken,
					roles: response.data.roles,
				});
				this.router.navigate(['/dashboard']);
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
		// signinForm.reset();
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

	// manually reset the recaptcha

	resetReCaptcha(): void {
		this.reCaptcha.reset();
	}

	handleReCaptchaErrored(errorDetails: RecaptchaErrorParameters) {
		// console.warn(errorDetails);

		this.toastService.enqueueToastNotification({
			message: 'reCAPTCHA encounters an error(usually network connectivity). Please try again',
			type: this.constants.ALERT_TYPE.ERROR,
		});
	}
}
