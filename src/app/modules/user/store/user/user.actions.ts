import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IAddCredential, IAddEmailTemplate, ICredentialData, IEmailTemplateData } from '@userModels/';

export const userActions = createActionGroup({
	source: 'User',
	events: {
		// Get Credential List

		getCredentialList: emptyProps(),
		getCredentialListSuccess: props<{ credentialList: ICredentialData[] }>(),
		getCredentialListFailure: props<{ message: string }>(),
		// Post Credential

		addCredential: props<IAddCredential>(),
		addCredentialSuccess: props<{ message: string }>(),
		addCredentialFailure: props<{ message: string }>(),
		// Delete Credential

		deleteCredential: props<{ _id: string }>(),
		deleteCredentialSuccess: props<{ message: string }>(),
		deleteCredentialFailure: props<{ message: string }>(),
		// Edit Credential

		editCredential: props<{ _id: string; data: IAddCredential }>(),
		editCredentialSuccess: props<{ message: string }>(),
		editCredentialFailure: props<{ message: string }>(),
		// Get Email Template List

		getEmailTemplateList: emptyProps(),
		getEmailTemplateListSuccess: props<{ emailTemplateList: IEmailTemplateData[] }>(),
		getEmailTemplateListFailure: props<{ message: string }>(),
		// Post Credential

		addEmailTemplate: props<IAddEmailTemplate>(),
		addEmailTemplateSuccess: props<{ message: string }>(),
		addEmailTemplateFailure: props<{ message: string }>(),
		// Delete EmailTemplate

		deleteEmailTemplate: props<{ _id: string }>(),
		deleteEmailTemplateSuccess: props<{ message: string }>(),
		deleteEmailTemplateFailure: props<{ message: string }>(),
		// Edit EmailTemplate

		editEmailTemplate: props<{ _id: string; data: IAddEmailTemplate }>(),
		editEmailTemplateSuccess: props<{ message: string }>(),
		editEmailTemplateFailure: props<{ message: string }>(),
	},
});
