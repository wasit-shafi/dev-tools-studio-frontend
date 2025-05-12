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
	},
});
