import { AnimationOptions, LottieComponent } from 'ngx-lottie';

import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Constants } from '@coreShared/';

@Component({
	selector: 'dts-not-found',
	imports: [RouterLink, LottieComponent],
	templateUrl: './not-found.component.html',
	styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
	public readonly constants = inject(Constants);
	public readonly lottieCustomStyles = {
		marginLeft: '65px',
	};

	public readonly lottieAnimationOptions: AnimationOptions = {
		path: 'assets/lottie/404-not-found-animation.json',
	};

	constructor() {}
}
