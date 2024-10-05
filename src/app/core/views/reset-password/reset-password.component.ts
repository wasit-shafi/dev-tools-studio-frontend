import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { Constants } from '@coreShared/';
import { environment } from '@environments/';

@Component({
	selector: 'dts-reset-password',
	standalone: true,
	imports: [FormsModule],
	providers: [Constants],
	templateUrl: './reset-password.component.html',
	styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
	private readonly http = inject(HttpClient);
	public readonly constants = inject(Constants);

	public resetPasswordFormDetails = {
		email: '',
		otp: '',
	};

	handleOnSubmitResetPasswordForm(event: any, signinForm: NgForm) {
		event.preventDefault();

		signinForm.reset();
	}
}
