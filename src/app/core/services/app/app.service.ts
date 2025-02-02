import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class AppService {
	private readonly platformId = inject(PLATFORM_ID);
	public readonly isBrowser: WritableSignal<boolean> = signal(false);

	constructor() {
		this.isBrowser.set(isPlatformBrowser(this.platformId));
	}
}
