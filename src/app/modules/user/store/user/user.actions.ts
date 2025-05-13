import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IAddCredential, ICredentialData } from '@userModels/';

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
	},
});
