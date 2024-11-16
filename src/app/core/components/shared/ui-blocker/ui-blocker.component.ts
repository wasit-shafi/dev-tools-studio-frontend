import { uiFeature } from '@coreStore/';
import { Store } from '@ngrx/store';
import { Component, inject, OnInit } from '@angular/core';

@Component({
	selector: 'dts-ui-blocker',
	standalone: true,
	imports: [],
	templateUrl: './ui-blocker.component.html',
	styleUrl: './ui-blocker.component.scss',
})
export class UiBlockerComponent implements OnInit {
	public store = inject(Store);

	public blocker: any;

	constructor() {}

	ngOnInit(): void {
		this.store.select(uiFeature.selectBlocker).subscribe({
			next: (blocker) => {
				this.blocker = blocker;
			},
		});
	}
}
