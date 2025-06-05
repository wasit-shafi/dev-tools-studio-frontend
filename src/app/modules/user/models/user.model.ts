import { IApiBaseResponse } from '@coreModels/';

export interface IEmailData {
	from: string;
	sendNow: boolean;
	dateTimeLocal: string;
	to: string;
	subject: string;
	salutation: string;
	body: string;
	closing: string;
	signature: string;
	attachmentIds: string[];
	receiveConfirmationEmail: boolean;
}

export interface IPostEmailResponse extends IApiBaseResponse {}

export interface IAddCredential {
	credentialType: string;
	displayName: string;
	emailId: string;
	host: string;
	port: string;
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
export interface IEditEmailTemplateRequestBody extends Omit<IEmailTemplateData, '_id'> {}

export interface IEditEmailTemplateResponse extends IApiBaseResponse {
	data: { _id: string };
}

export interface IAddProfilePicture {
	formData: FormData;
}

export interface IAddAttachment {
	formData: FormData;
}

export interface IAttachmentData {
	_id: string;
	attachmentName: string;
	fileName: string;
}

export interface IAddAttachmentResponse extends IApiBaseResponse {
	data: null;
}

export interface IDeleteAttachmentResponse extends IApiBaseResponse {
	data: null;
}

export interface IGetAttachmentListResponse extends IApiBaseResponse {
	data: {
		attachmentList: IAttachmentData[];
	};
}

export interface IUserState {
	credentialList: ICredentialData[] | null;
	emailTemplateList: IEmailTemplateData[] | null;
	attachmentList: IAttachmentData[] | null;
}
