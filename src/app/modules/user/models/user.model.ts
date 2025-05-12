import { IApiBaseResponse } from '@coreModels/';

export interface IAddCredential {
	credentialType: number;
	emailId: string;
	host: string;
	port: number;
	user: string;
	pass: string;
}

export interface ICredentialData {
	_id: string;
	credentialType: number;
	emailId: string;
	host: string;
	port: number;
	user: string;
	pass: string;
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

export interface IPostCredentialRequestBody {
	credentialType: number;
	emailId: string;
	host: string;
	port: number;
	user: string;
	pass: string;
}

export interface IPostCredentialResponse extends IApiBaseResponse {
	data: {
		_id: string;
	};
}

export interface IUserState {
	credentialList: ICredentialData[] | null;
}
