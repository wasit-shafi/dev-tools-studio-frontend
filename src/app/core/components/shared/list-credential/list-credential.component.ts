import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { EditCredentialComponent } from '@coreComponents/';
import { Constants } from '@coreShared/';
import { Store } from '@ngrx/store';
import { ICredentialData, IUserState } from '@userModels/';
import { userActions, userFeature } from '@userStore/';

@Component({
	selector: 'dts-list-credential',
	imports: [EditCredentialComponent],
	providers: [Constants],
	templateUrl: './list-credential.component.html',
	styleUrl: './list-credential.component.scss',
})
export class ListCredentialComponent implements OnInit {
	@ViewChild('editCredentialComponent') editCredentialComponent!: EditCredentialComponent;

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

	protected handleEditCredential(credential: ICredentialData): void {
		this.editCredentialComponent.handleOnModalOpen({ ...credential });
	}

	protected handleDeleteCredential(_id: string): void {
		this.store.dispatch(userActions.deleteCredential({ _id }));
	}
}
