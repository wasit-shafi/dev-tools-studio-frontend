import { Observable } from 'rxjs';

import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { IBlocker } from '@coreModels/ui.model';
import { uiFeature } from '@coreStore/';
import { Store } from '@ngrx/store';

@Component({
	selector: 'dts-ui-blocker',
	imports: [AsyncPipe],
	templateUrl: './ui-blocker.component.html',
	styleUrl: './ui-blocker.component.scss',
})
export class UiBlockerComponent implements OnInit {
	protected readonly store = inject(Store);

	constructor() {}

	protected blocker$!: Observable<IBlocker>;

	ngOnInit(): void {
		this.blocker$ = this.store.select(uiFeature.selectBlocker);
	}
}
