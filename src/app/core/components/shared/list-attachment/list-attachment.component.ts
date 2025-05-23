import { Observable } from 'rxjs';

import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Constants } from '@coreShared/';
import { Store } from '@ngrx/store';
import { IUserState } from '@userModels/';
import { userActions, userFeature } from '@userStore/';

@Component({
	selector: 'dts-list-attachment',
	imports: [AsyncPipe],
	templateUrl: './list-attachment.component.html',
	styleUrl: './list-attachment.component.scss',
})
export class ListAttachmentComponent implements OnInit {
	protected readonly constants = inject(Constants);
	private readonly store = inject(Store);

	protected readonly attachmentList$: Observable<IUserState['attachmentList']> = this.store.select(
		userFeature.selectAttachmentList
	);

	ngOnInit(): void {
		this.store.dispatch(userActions.getAttachmentList());
	}

	protected handleDeleteAttachment(_id: string): void {
		this.store.dispatch(userActions.deleteAttachment({ _id }));
	}
}
