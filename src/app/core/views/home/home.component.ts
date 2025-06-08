import { GalleriaModule } from 'primeng/galleria';

import { Component } from '@angular/core';
import { environment } from '@environments/';

@Component({
	selector: 'dts-home',
	imports: [GalleriaModule],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
})
export class HomeComponent {
	protected readonly environment = environment;
	protected readonly images: { itemImageSrc: string; thumbnailImageSrc: string }[] = [
		{
			itemImageSrc:
				'https://res.cloudinary.com/dtlx6i2m7/image/upload/v1749420147/dev-tools-studio/snapshots/rcfpiv4bmlq5gce0jr0k.png',
			thumbnailImageSrc:
				'https://res.cloudinary.com/dtlx6i2m7/image/upload/v1749420147/dev-tools-studio/snapshots/rcfpiv4bmlq5gce0jr0k.png',
		},
		{
			itemImageSrc:
				'https://res.cloudinary.com/dtlx6i2m7/image/upload/v1749420147/dev-tools-studio/snapshots/xca9ff8mdc2suw0qnfb9.png',
			thumbnailImageSrc:
				'https://res.cloudinary.com/dtlx6i2m7/image/upload/v1749420147/dev-tools-studio/snapshots/xca9ff8mdc2suw0qnfb9.png',
		},
		{
			itemImageSrc:
				'https://res.cloudinary.com/dtlx6i2m7/image/upload/v1749420146/dev-tools-studio/snapshots/qkhhv2zojctsheqjjjgk.png',
			thumbnailImageSrc:
				'https://res.cloudinary.com/dtlx6i2m7/image/upload/v1749420146/dev-tools-studio/snapshots/qkhhv2zojctsheqjjjgk.png',
		},
		{
			itemImageSrc:
				'https://res.cloudinary.com/dtlx6i2m7/image/upload/v1749420146/dev-tools-studio/snapshots/in4k2v7rhf5bocfsipl7.png',
			thumbnailImageSrc:
				'https://res.cloudinary.com/dtlx6i2m7/image/upload/v1749420146/dev-tools-studio/snapshots/in4k2v7rhf5bocfsipl7.png',
		},
		{
			itemImageSrc:
				'https://res.cloudinary.com/dtlx6i2m7/image/upload/v1749420146/dev-tools-studio/snapshots/mkj39n7zl861puaa5agn.png',
			thumbnailImageSrc:
				'https://res.cloudinary.com/dtlx6i2m7/image/upload/v1749420146/dev-tools-studio/snapshots/mkj39n7zl861puaa5agn.png',
		},
		{
			itemImageSrc:
				'https://res.cloudinary.com/dtlx6i2m7/image/upload/v1749420145/dev-tools-studio/snapshots/nud8eie9av2xadniq957.png',
			thumbnailImageSrc:
				'https://res.cloudinary.com/dtlx6i2m7/image/upload/v1749420145/dev-tools-studio/snapshots/nud8eie9av2xadniq957.png',
		},
		{
			itemImageSrc:
				'https://res.cloudinary.com/dtlx6i2m7/image/upload/v1749420145/dev-tools-studio/snapshots/ow3vj4ticazky1sdjy17.png',
			thumbnailImageSrc:
				'https://res.cloudinary.com/dtlx6i2m7/image/upload/v1749420145/dev-tools-studio/snapshots/ow3vj4ticazky1sdjy17.png',
		},
		{
			itemImageSrc:
				'https://res.cloudinary.com/dtlx6i2m7/image/upload/v1749420140/dev-tools-studio/snapshots/jhbtahpsgtr0wcbmjib4.png',
			thumbnailImageSrc:
				'https://res.cloudinary.com/dtlx6i2m7/image/upload/v1749420140/dev-tools-studio/snapshots/jhbtahpsgtr0wcbmjib4.png',
		},
		{
			itemImageSrc:
				'https://res.cloudinary.com/dtlx6i2m7/image/upload/v1749420140/dev-tools-studio/snapshots/zgs2uulgvlpn6csij00d.png',
			thumbnailImageSrc:
				'https://res.cloudinary.com/dtlx6i2m7/image/upload/v1749420140/dev-tools-studio/snapshots/zgs2uulgvlpn6csij00d.png',
		},
	];

	protected readonly responsiveOptions: { breakpoint: string; numVisible: number }[] = [
		{
			breakpoint: '1000000px', // max breakpoint
			numVisible: 9,
		},
		{
			breakpoint: '575px',
			numVisible: 5,
		},
		{
			breakpoint: '400px',
			numVisible: 3,
		},
		{
			breakpoint: '300px',
			numVisible: 2,
		},
	];
}
