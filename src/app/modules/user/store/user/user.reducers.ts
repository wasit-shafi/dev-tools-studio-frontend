import { createFeature, createReducer, on } from '@ngrx/store';
import { IUserState } from '@userModels/';

import { userActions } from './user.actions';
import { initialUserState } from './user.state';

const reducer = createReducer(
	initialUserState,
	on(userActions.getCredentialListSuccess, (state, action): IUserState => {
		return { ...state, credentialList: action.credentialList };
	}),
	on(userActions.getEmailTemplateListSuccess, (state, action): IUserState => {
		return { ...state, emailTemplateList: action.emailTemplateList };
	})
);

export const userFeature = createFeature({
	name: 'user',
	reducer,
});
