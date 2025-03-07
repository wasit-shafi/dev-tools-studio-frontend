import { inject, Injectable, OnDestroy } from '@angular/core';
import { AppService } from '@coreServices/app/app.service';
import { Constants } from '@coreShared/';

// TODO: review how can we get below type from constants + need for separate *.model.ts file
type ToastAlertType = '' | 'alert-info' | 'alert-success' | 'alert-warning' | 'alert-error';

interface IToast {
	message: string;
	type?: ToastAlertType;
}

interface IToastNotificationQueue {
	message: string;
	type: ToastAlertType;
	timestamp: Date;
}

@Injectable({
	providedIn: 'root',
})
export class ToastService implements OnDestroy {
	private readonly constants = inject(Constants);
	private readonly appService = inject(AppService);

	// In a second we can dismiss 3 alerts max
	private readonly WORKER_INTERVAL_DELAY = 333;
	private readonly TOAST_NOTIFICATION_HOLD_DURATION = 6000;
	public readonly toastNotificationQueue: IToastNotificationQueue[] = [];

	private intervalID?: ReturnType<typeof setInterval>;

	ngOnDestroy(): void {
		if (this.intervalID) {
			clearInterval(this.intervalID);
		}
	}

	private startNotificationWorker(): void {
		// For more info refer: https://stackoverflow.com/a/78011586/10249156

		if (this.appService.isBrowser()) {
			// executed only if it's currently running from browser not on server (SSR)
			this.intervalID = setInterval(this.dequeueToastNotificationWorker.bind(this), this.WORKER_INTERVAL_DELAY);
		}
	}

	private stopNotificationWorker(): void {
		clearInterval(this.intervalID);
	}

	public enqueueToastNotification(params: IToast): void {
		if (!this.toastNotificationQueue.length) {
			this.startNotificationWorker();
		}

		this.toastNotificationQueue.push({
			message: params.message,
			type: params.type || this.constants.ALERT_TYPE.SUCCESS,
			timestamp: new Date(),
		});
	}

	private dequeueToastNotificationWorker(): void {
		if (this.toastNotificationQueue?.length) {
			const timeDifferenceInMs = new Date().getTime() - this.toastNotificationQueue[0].timestamp.getTime();

			if (timeDifferenceInMs > this.TOAST_NOTIFICATION_HOLD_DURATION) {
				this.toastNotificationQueue.shift();

				if (!this.toastNotificationQueue.length && this.intervalID) {
					this.stopNotificationWorker();
				}
			}
		}
	}
}
