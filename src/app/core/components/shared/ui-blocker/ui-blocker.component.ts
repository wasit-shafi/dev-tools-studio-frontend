import { Observable } from 'rxjs';

import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { IBlocker } from '@coreModels/';
import { uiFeature } from '@coreStore/';
import { Store } from '@ngrx/store';

@Component({
	selector: 'dts-ui-blocker',
	imports: [AsyncPipe, NgOptimizedImage],
	templateUrl: './ui-blocker.component.html',
	styleUrl: './ui-blocker.component.scss',
})
export class UiBlockerComponent implements OnInit {
	protected readonly store = inject(Store);

	constructor() {}

	protected blocker$: Observable<IBlocker> = this.store.select(uiFeature.selectBlocker);

	ngOnInit(): void {}
}
