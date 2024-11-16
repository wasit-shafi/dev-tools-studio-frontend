import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HasRoleDirective } from '@coreDirectives/';
import { BcChannelService } from '@coreServices/';
import { Constants } from '@coreShared/';
import { IAuthState } from '@coreModels/';
import { authActions, authFeature } from '@coreStore/';
import { Store } from '@ngrx/store';

@Component({
	selector: 'dts-nav',
	standalone: true,
	providers: [Constants],
	imports: [CommonModule, RouterLink, RouterLinkActive, HasRoleDirective],
	templateUrl: './nav.component.html',
	styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit {
	public readonly constants = inject(Constants);
	public readonly store = inject(Store);
	public readonly bcChannelService = inject(BcChannelService);

	public authState!: IAuthState;

	ngOnInit(): void {
		this.store.select(authFeature.selectAuthState).subscribe({
			next: (data) => {
				this.authState = data;
			},
			error: () => {},
			complete: () => {},
		});
	}

	public handleSignOut = () => {
		this.store.dispatch(authActions.signout());
		this.bcChannelService.handleSignoutFromAllTabs();
	};
}
