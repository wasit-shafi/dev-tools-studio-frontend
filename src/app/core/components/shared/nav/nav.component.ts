import { Observable } from 'rxjs';

import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HasPermissionDirective } from '@coreDirectives/';
import { IAuthState } from '@coreModels/';
import { BcChannelService } from '@coreServices/';
import { Constants } from '@coreShared/';
import { authActions, authFeature } from '@coreStore/';
import { Store } from '@ngrx/store';

@Component({
	selector: 'dts-nav',
	providers: [Constants],
	imports: [CommonModule, RouterLink, RouterLinkActive, HasPermissionDirective, AsyncPipe, FormsModule],
	templateUrl: './nav.component.html',
	styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit {
	protected readonly constants = inject(Constants);
	protected readonly store = inject(Store);
	protected readonly bcChannelService = inject(BcChannelService);

	protected readonly currentUser$: Observable<IAuthState['currentUser']> = this.store.select(
		authFeature.selectCurrentUser
	);

	ngOnInit(): void {}

	protected handleSignOut(): void {
		this.store.dispatch(authActions.signout());
		this.bcChannelService.handleSignoutFromAllTabs();
	}

	protected handleUploadProfilePicture(event: Event): void {
		const target = event.target as HTMLInputElement;

		if (target?.files?.length) {
			const formData = new FormData();

			formData.append('profilePicture', target.files[0]);
			this.store.dispatch(authActions.profilePicture({ formData }));
		}
	}
}
