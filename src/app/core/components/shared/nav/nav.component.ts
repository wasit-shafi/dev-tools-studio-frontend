import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HasRoleDirective } from '@coreDirectives/';
import { IAuthState } from '@coreModels/';
import { BcChannelService } from '@coreServices/';
import { Constants } from '@coreShared/';
import { authActions, authFeature } from '@coreStore/';
import { Store } from '@ngrx/store';

@Component({
	selector: 'dts-nav',
	providers: [Constants],
	imports: [CommonModule, RouterLink, RouterLinkActive, HasRoleDirective],
	templateUrl: './nav.component.html',
	styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit {
	protected readonly constants = inject(Constants);
	protected readonly store = inject(Store);
	protected readonly bcChannelService = inject(BcChannelService);

	protected authState!: IAuthState;

	ngOnInit(): void {
		this.store.select(authFeature.selectAuthState).subscribe({
			next: (data) => {
				this.authState = data;
			},
			error: () => {},
			complete: () => {},
		});
	}

	protected handleSignOut = () => {
		this.store.dispatch(authActions.signout());
		this.bcChannelService.handleSignoutFromAllTabs();
	};
}
