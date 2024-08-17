import { isPlatformBrowser } from '@angular/common';
import { inject, Inject, Injectable, OnDestroy, PLATFORM_ID, signal, WritableSignal } from '@angular/core';

import { Constants } from '@coreShared/';

// TODO: review how can we get below type from constants + need for separate *.model.ts file
type ToastAlertType = '' | 'alert-info' | 'alert-success' | 'alert-warning' | 'alert-error';

interface IToast {
	message: string;
	type: ToastAlertType;
}

@Injectable({
	providedIn: 'root',
})
export class ToastService implements OnDestroy {
	// TODO: handle no provider issue for DI
	// private constants = inject(Constants);

	private INTERVAL_DURATION = 4000;
	public toastNotificationQueue: IToast[] = [];
	private intervalID?: ReturnType<typeof setInterval>;
	private isBrowser: WritableSignal<boolean> = signal(false);

	constructor(@Inject(PLATFORM_ID) platformId: object) {
		this.isBrowser.set(isPlatformBrowser(platformId));
		// For more about info why using to use this.isBrowser() refer: https://stackoverflow.com/a/78011586/10249156

		if (this.isBrowser()) {
			this.intervalID = setInterval(this.dequeueToastNotificationWorker, this.INTERVAL_DURATION);
		}
	}

	ngOnDestroy(): void {
		if (this.intervalID) {
			clearInterval(this.intervalID);
		}
	}

	public enqueueToastNotification = (params: IToast) => {
		this.toastNotificationQueue.push({
			message: params.message,
			// type: params.type || this.constants.ALERT_TYPE.SUCCESS,
			type: params.type || '',
		});
	};

	public dequeueToastNotificationWorker(): void {
		if (this.toastNotificationQueue?.length) {
			this.toastNotificationQueue.shift();
		}
	}
}
