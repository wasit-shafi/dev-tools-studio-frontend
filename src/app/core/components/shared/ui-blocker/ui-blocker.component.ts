import { Component, inject, OnInit } from '@angular/core';
import { uiFeature } from '@coreStore/';
import { Store } from '@ngrx/store';

@Component({
	selector: 'dts-ui-blocker',
	imports: [],
	templateUrl: './ui-blocker.component.html',
	styleUrl: './ui-blocker.component.scss',
})
export class UiBlockerComponent implements OnInit {
	protected store = inject(Store);

	protected blocker: any;

	constructor() {}

	ngOnInit(): void {
		this.store.select(uiFeature.selectBlocker).subscribe({
			next: (blocker) => {
				this.blocker = blocker;
			},
		});
	}
}
