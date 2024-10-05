import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, OnDestroy, PLATFORM_ID, signal, WritableSignal } from '@angular/core';

import { Constants } from '@coreShared/';

// TODO: review how can we get below type from constants + need for separate *.model.ts file
type ToastAlertType = '' | 'alert-info' | 'alert-success' | 'alert-warning' | 'alert-error';

interface IToast {
	message: string;
	type: ToastAlertType;
}

interface IToastNotificationQueue extends IToast {
	timestamp: Date;
}

@Injectable({
	providedIn: 'root',
})
export class ToastService implements OnDestroy {
	public readonly constants = inject(Constants);
	private readonly platformId = inject(PLATFORM_ID);

	// In a second we can dismiss 3 alerts max
	private readonly WORKER_INTERVAL_DELAY = 333;
	private readonly TOAST_NOTIFICATION_HOLD_DURATION = 6000;
	public toastNotificationQueue: IToastNotificationQueue[] = [];

	private intervalID?: ReturnType<typeof setInterval>;
	private isBrowser: WritableSignal<boolean> = signal(false);

	ngOnDestroy(): void {
		if (this.intervalID) {
			clearInterval(this.intervalID);
		}
	}

	private startNotificationWorker() {
		this.isBrowser.set(isPlatformBrowser(this.platformId));
		// For more info refer: https://stackoverflow.com/a/78011586/10249156

		if (this.isBrowser()) {
			// executed only if its currently running from browser not on server (SSR)
			this.intervalID = setInterval(this.dequeueToastNotificationWorker, this.WORKER_INTERVAL_DELAY);
		}
	}

	private stopNotificationWorker() {
		clearInterval(this.intervalID);
	}

	public enqueueToastNotification = (params: IToast) => {
		if (!this.toastNotificationQueue.length) {
			this.startNotificationWorker();
		}

		this.toastNotificationQueue.push({
			message: params.message,
			type: params.type || this.constants.ALERT_TYPE.SUCCESS,
			timestamp: new Date(),
		});
	};

	private dequeueToastNotificationWorker = () => {
		if (this.toastNotificationQueue?.length) {
			const timeDifferenceInMs = new Date().getTime() - this.toastNotificationQueue[0].timestamp.getTime();

			if (timeDifferenceInMs > this.TOAST_NOTIFICATION_HOLD_DURATION) {
				this.toastNotificationQueue.shift();

				if (!this.toastNotificationQueue.length && this.intervalID) {
					this.stopNotificationWorker();
				}
			}
		}
	};
}
