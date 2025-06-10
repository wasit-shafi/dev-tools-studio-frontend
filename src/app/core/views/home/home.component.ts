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
	protected readonly responsiveOptions: { breakpoint: string; numVisible: number }[] = [
		{
			breakpoint: '1024px',
			numVisible: 14,
		},
		{
			breakpoint: '850px',
			numVisible: 10,
		},

		{
			breakpoint: '650px',
			numVisible: 8,
		},
		{
			breakpoint: '570px',
			numVisible: 7,
		},
		{
			breakpoint: '500px',
			numVisible: 5,
		},
		{
			breakpoint: '420px',
			numVisible: 4,
		},
		{
			breakpoint: '380px',
			numVisible: 3,
		},
		{
			breakpoint: '330px',
			numVisible: 2,
		},
	];

	protected readonly images: { imageSrc: string; itemLink?: string }[] = [
		{
			// snapshots/diagrams: All Architecture Diagrams image
			imageSrc:
				'https://res.cloudinary.com/dtlx6i2m7/image/upload/v1749506957/dev-tools-studio/snapshots/diagrams/xjzevaxf8fdhz8r86gyw.png',
			itemLink: 'https://app.eraser.io/workspace/cwZzopjoFs0wIiPvRI8X',
		},
		{
			// snapshots/diagrams: Data Modelling image
			imageSrc:
				'https://res.cloudinary.com/dtlx6i2m7/image/upload/v1749420146/dev-tools-studio/snapshots/diagrams/mkj39n7zl861puaa5agn.png',
			itemLink: 'https://app.eraser.io/workspace/cwZzopjoFs0wIiPvRI8X',
		},
		{
			// snapshots/diagrams: request to response flow image
			imageSrc:
				'https://res.cloudinary.com/dtlx6i2m7/image/upload/v1749420146/dev-tools-studio/snapshots/diagrams/qkhhv2zojctsheqjjjgk.png',
			itemLink: 'https://app.eraser.io/workspace/cwZzopjoFs0wIiPvRI8X',
		},
		{
			// snapshots/diagrams: POST:/email controller flow image
			imageSrc:
				'https://res.cloudinary.com/dtlx6i2m7/image/upload/v1749420147/dev-tools-studio/snapshots/diagrams/rcfpiv4bmlq5gce0jr0k.png',
			itemLink: 'https://app.eraser.io/workspace/cwZzopjoFs0wIiPvRI8X',
		},
		{
			// snapshots/diagrams: Backend Architecture (Development) image
			imageSrc:
				'https://res.cloudinary.com/dtlx6i2m7/image/upload/v1749506955/dev-tools-studio/snapshots/diagrams/yetvsvxy7wqgoqsbhcjv.png',
			itemLink: 'https://app.eraser.io/workspace/cwZzopjoFs0wIiPvRI8X',
		},
		{
			// snapshots/diagrams: Backend Architecture (Production) image
			imageSrc:
				'https://res.cloudinary.com/dtlx6i2m7/image/upload/v1749420145/dev-tools-studio/snapshots/diagrams/nud8eie9av2xadniq957.png',
			itemLink: 'https://app.eraser.io/workspace/cwZzopjoFs0wIiPvRI8X',
		},
		{
			// snapshots/diagrams: CICD workflow image
			imageSrc:
				'https://res.cloudinary.com/dtlx6i2m7/image/upload/v1749420147/dev-tools-studio/snapshots/diagrams/xca9ff8mdc2suw0qnfb9.png',
			itemLink: 'https://app.eraser.io/workspace/cwZzopjoFs0wIiPvRI8X',
		},
		//
		{
			// snapshots/cicd: All workflows
			imageSrc:
				'https://res.cloudinary.com/dtlx6i2m7/image/upload/v1749533434/dev-tools-studio/snapshots/cicd/rt1sxzvcfskx6ube9ber.png',
			itemLink: 'https://github.com/wasit-shafi/dev-tools-studio-backend/actions',
		},
		{
			// snapshots/cicd: self hosted runner
			imageSrc:
				'https://res.cloudinary.com/dtlx6i2m7/image/upload/v1749533433/dev-tools-studio/snapshots/cicd/fncdodxpuerl7sm7eq0g.png',
		},
		{
			// snapshots/cicd: github hosted runner
			imageSrc:
				'https://res.cloudinary.com/dtlx6i2m7/image/upload/v1749533433/dev-tools-studio/snapshots/cicd/qerfxdcjdcr4o4gyvruz.png',
		},
		{
			// snapshots/cicd: Actions Usage Metrics
			imageSrc:
				'https://res.cloudinary.com/dtlx6i2m7/image/upload/v1749533433/dev-tools-studio/snapshots/cicd/qc0zru6m6nglgxqst2rb.png',
		},
		{
			// snapshots/cicd: images on DockerHub
			imageSrc:
				'https://res.cloudinary.com/dtlx6i2m7/image/upload/v1749533433/dev-tools-studio/snapshots/cicd/ygabjr1nxjbk1nm3m2ov.png',
			itemLink: 'https://hub.docker.com/repositories/wasitshafi700',
		},
		//
		{
			// snapshots/bullmq-and-redis: Redis Cloud
			imageSrc:
				'https://res.cloudinary.com/dtlx6i2m7/image/upload/v1749534016/dev-tools-studio/snapshots/bullmq-and-redis/wbkts17tjpcd6nqnagsy.png',
		},
		{
			// snapshots/bullmq-and-redis: bullmq dashboard
			imageSrc:
				'https://res.cloudinary.com/dtlx6i2m7/image/upload/v1749534016/dev-tools-studio/snapshots/bullmq-and-redis/sczd2xggj9eje7vd3m4r.png',
		},
		{
			// snapshots/bullmq-and-redis: email queue data
			imageSrc:
				'https://res.cloudinary.com/dtlx6i2m7/image/upload/v1749534017/dev-tools-studio/snapshots/bullmq-and-redis/xxowe9qfjakxrdq6vr6q.png',
		},
		{
			// snapshots/bullmq-and-redis: redis db data
			imageSrc:
				'https://res.cloudinary.com/dtlx6i2m7/image/upload/v1749534017/dev-tools-studio/snapshots/bullmq-and-redis/aeukolkwtk0qm2iqqwvy.png',
		},

		//
		{
			// snapshots/others: MongoDB Atlas
			imageSrc:
				'https://res.cloudinary.com/dtlx6i2m7/image/upload/v1749533396/dev-tools-studio/snapshots/others/tijsfdbgnbyelonzzrqk.png',
		},
		{
			// snapshots/others: EC2
			imageSrc:
				'https://res.cloudinary.com/dtlx6i2m7/image/upload/v1749533395/dev-tools-studio/snapshots/others/wlc8izmnmsb46xpphqos.png',
		},
		{
			// snapshots/others: S3 - user attachments
			imageSrc:
				'https://res.cloudinary.com/dtlx6i2m7/image/upload/v1749533395/dev-tools-studio/snapshots/others/pddokrsla3nxxekrpmko.png',
		},
		{
			// snapshots/others:
			imageSrc:
				'https://res.cloudinary.com/dtlx6i2m7/image/upload/v1749533395/dev-tools-studio/snapshots/others/yy1ybbu7c6rdemgxojne.png',
		},
		{
			// snapshots/others: Postman API Collection image
			imageSrc:
				'https://res.cloudinary.com/dtlx6i2m7/image/upload/v1749533395/dev-tools-studio/snapshots/others/cblhllzhmodksplsqgdj.png',
			itemLink: 'https://www.postman.com/wasitshafi/dev-tools-studio-public-wrokspace/overview',
		},
	];
}
