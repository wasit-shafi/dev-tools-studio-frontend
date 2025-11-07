import { GalleriaModule } from 'primeng/galleria';

import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Constants } from '@coreShared/';
import { environment } from '@environments/';

@Component({
	selector: 'dts-home',
	imports: [GalleriaModule, RouterLink],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
})
export class HomeComponent {
	protected readonly constants = inject(Constants);

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

	protected readonly referenceLinks: { label: string; url: string }[] = [
		{
			label: 'Deployment Link (Backend):',
			url: environment.baseUrl,
		},
		{
			label: 'Deployment Link (Frontend):',
			url: environment.frontendDeploymentUrl,
		},
		{
			label: 'Architecture Diagram:',
			url: 'https://app.eraser.io/workspace/cwZzopjoFs0wIiPvRI8X',
		},
		{
			label: 'Postman Collection:',
			url: 'https://www.postman.com/wasitshafi/dev-tools-studio-public-wrokspace/overview',
		},
		{
			label: 'Backend Source Code:',
			url: 'https://github.com/wasit-shafi/dev-tools-studio-backend',
		},
		{
			label: 'Frontend Source Code:',
			url: 'https://github.com/wasit-shafi/dev-tools-studio-frontend',
		},
		{
			label: 'Github Project Board:',
			url: 'https://github.com/users/wasit-shafi/projects/5/views/1',
		},
		{
			label: 'Backend Docker Image:',
			url: 'https://hub.docker.com/r/wasitshafi700/dev-tools-studio-backend',
		},
		{
			label: 'Frontend Docker Image:',
			url: 'https://hub.docker.com/r/wasitshafi700/dev-tools-studio-frontend',
		},
	];
}
