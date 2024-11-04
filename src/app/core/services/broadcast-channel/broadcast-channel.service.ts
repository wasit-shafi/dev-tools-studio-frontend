import { inject, Injectable } from '@angular/core';
import { Constants } from '@coreShared/index';
import { Store } from '@ngrx/store';

@Injectable({
	providedIn: 'root',
})
export class BcChannelService {
	private readonly constants = inject(Constants);
	private readonly store = inject(Store);

	//Refer for more info:  https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API
	private readonly userBroadcastChannel = new BroadcastChannel(this.constants.BROADCAST_CHANNELS.USER.CHANNEL_NAME);

	constructor() {
		this.userBroadcastChannel.onmessage = this.userBroadcastChannelOnMessageListener.bind(this);
	}

	ngOnDestroy(): void {
		// Disconnect userBroadcastChannel channel
		this.userBroadcastChannel.close();
	}

	private userBroadcastChannelOnMessageListener(event: any): void {
		const { data } = event;

		if (data.event == this.constants.BROADCAST_CHANNELS.USER.EVENTS.SIGNOUT) {
			//TODO: temporarily reloading the page
			location.reload();
		}
	}

	public handleSignoutFromAllTabs(): void {
		this.userBroadcastChannel.postMessage({ event: this.constants.BROADCAST_CHANNELS.USER.EVENTS.SIGNOUT });
	}
}
