import { Component, inject, OnInit } from '@angular/core';
import { Constants } from '@coreShared/';
import { Store } from '@ngrx/store';
import { ICredentialData, IUserState } from '@userModels/';
import { userActions, userFeature } from '@userStore/user';

@Component({
	selector: 'dts-list-credential',
	imports: [],
	providers: [Constants],
	templateUrl: './list-credential.component.html',
	styleUrl: './list-credential.component.scss',
})
export class ListCredentialComponent implements OnInit {
	protected userState!: IUserState;

	protected readonly constants = inject(Constants);
	private readonly store = inject(Store);

	ngOnInit(): void {
		this.store.dispatch(userActions.getCredentialList());

		this.store.select(userFeature.selectUserState).subscribe({
			next: (data) => {
				this.userState = data;
			},
			error: () => {},
			complete: () => {},
		});
	}

	protected handleEditCredential(credential: ICredentialData) {
		console.log('show edit modal to update credential :: ', credential);
	}

	protected handleDeleteCredential(credentialId: string) {
		console.log('Delete :: ', credentialId);
	}
}
