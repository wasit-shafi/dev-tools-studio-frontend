import { IApiBaseResponse } from '@coreModels/';

export interface IAddCredential {
	credentialType: number;
	displayName: string;
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
	data: { _id: string };
}

export interface IAddEmailTemplate {
	templateName: string;
	subject: string;
	salutation: string;
	body: string;
	closing: string;
	signature: string;
	tags: string[];
}

export interface IEmailTemplateData extends IAddEmailTemplate {
	_id: string;
}

export interface IGetEmailTemplateListResponse extends IApiBaseResponse {
	data: {
		emailTemplateList: IEmailTemplateData[];
	};
}

export interface IDeleteEmailTemplateResponse extends IApiBaseResponse {
	data: null;
}

export interface IPostEmailTemplateRequestBody extends Omit<IEmailTemplateData, '_id'> {}

export interface IPostEmailTemplateResponse extends IApiBaseResponse {
	data: {
		_id: string;
	};
}

export interface IUserState {
	credentialList: ICredentialData[] | null;
	emailTemplateList: IEmailTemplateData[] | null;
}
