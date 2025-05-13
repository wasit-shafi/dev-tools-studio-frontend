import { IApiBaseResponse } from '@coreModels/';

export interface IAddCredential {
	credentialType: number;
	emailId: string;
	host: string;
	port: number;
	user: string;
	pass: string;
}

export interface ICredentialData extends IAddCredential {
	_id: string;
}

export interface IGetCredentialResponse extends IApiBaseResponse {
	data: {
		credential: ICredentialData;
	};
}

export interface IGetCredentialListResponse extends IApiBaseResponse {
	data: {
		credentialList: ICredentialData[];
	};
}

export interface IPostCredentialRequestBody extends Omit<ICredentialData, '_id'> {}

export interface IPostCredentialResponse extends IApiBaseResponse {
	data: {
		_id: string;
	};
}

export interface IDeleteCredentialResponse extends IApiBaseResponse {
	data: null;
}

export interface IEditCredentialRequestBody extends Omit<ICredentialData, '_id'> {}

export interface IEditCredentialResponse extends IApiBaseResponse {
	data: ICredentialData;
}

export interface IUserState {
	credentialList: ICredentialData[] | null;
}
