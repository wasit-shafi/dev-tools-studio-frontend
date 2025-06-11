import { ScrollTopModule } from 'primeng/scrolltop';

import { Component, inject } from '@angular/core';
import { Constants } from '@coreShared/';

@Component({
	selector: 'dts-snapshots',
	imports: [ScrollTopModule],
	templateUrl: './snapshots.html',
	styleUrl: './snapshots.scss',
})
export class Snapshots {
	protected readonly constants = inject(Constants);
}
