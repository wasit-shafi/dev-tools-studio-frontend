import { Observable } from 'rxjs';

import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { EditCredentialComponent } from '@coreComponents/';
import { Constants } from '@coreShared/';
import { Store } from '@ngrx/store';
import { ICredentialData, IUserState } from '@userModels/';
import { userActions, userFeature } from '@userStore/';

@Component({
	selector: 'dts-list-credential',
	imports: [EditCredentialComponent, AsyncPipe],
	providers: [Constants],
	templateUrl: './list-credential.component.html',
	styleUrl: './list-credential.component.scss',
})
export class ListCredentialComponent implements OnInit {
	@ViewChild('editCredentialComponent') editCredentialComponent!: EditCredentialComponent;
	protected readonly constants = inject(Constants);
	private readonly store = inject(Store);
	protected readonly credentialList$: Observable<IUserState['credentialList']> = this.store.select(
		userFeature.selectCredentialList
	);

	ngOnInit(): void {
		this.store.dispatch(userActions.getCredentialList());
	}

	protected handleEditCredential(credential: ICredentialData): void {
		this.editCredentialComponent.handleOnModalOpen({ ...credential });
	}

	protected handleDeleteCredential(_id: string): void {
		this.store.dispatch(userActions.deleteCredential({ _id }));
	}
}
