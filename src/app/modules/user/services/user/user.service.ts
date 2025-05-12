import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Constants } from '@coreShared/';
import { environment } from '@environments/';
import {
    IGetCredentialListResponse, IGetCredentialResponse, IPostCredentialRequestBody, IPostCredentialResponse
} from '@userModels/';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private readonly constants = inject(Constants);
	private readonly http = inject(HttpClient);

	constructor() {}

	public postCredential(data: IPostCredentialRequestBody): Observable<IPostCredentialResponse> {
		return this.http.post<IPostCredentialResponse>(
			`${environment.baseUrl}/${this.constants.API_PREFIX.API_V1}/user/credential`,
			data
		);
	}

	public getCredential(_id: string): Observable<IGetCredentialResponse> {
		return this.http.get<IGetCredentialResponse>(
			`${environment.baseUrl}/${this.constants.API_PREFIX.API_V1}/user/credential/${_id}`
		);
	}

	public getCredentialList(): Observable<IGetCredentialListResponse> {
		return this.http.get<IGetCredentialListResponse>(
			`${environment.baseUrl}/${this.constants.API_PREFIX.API_V1}/user/credential-list`
		);
	}

	public postEmailTemplate(data: any): Observable<any> {
		return this.http.post(`${environment.baseUrl}/${this.constants.API_PREFIX.API_V1}/user/email-template`, data);
	}
}
