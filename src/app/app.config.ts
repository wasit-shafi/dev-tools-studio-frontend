import { provideLottieOptions } from 'ngx-lottie';
import { providePrimeNG } from 'primeng/config';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { authInterceptor, loggingInterceptor } from '@coreInterceptors/';
import { errorInterceptor } from '@coreInterceptors/error/error.interceptor';
import { Constants } from '@coreShared/';
import { authFeature, uiFeature } from '@coreStore/';
import * as authEffects from '@coreStore/auth/auth.effects';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideClientHydration(),
		provideLottieOptions({
			player: () => import('lottie-web'), // lazy loading
		}),

		provideHttpClient(withFetch(), withInterceptors([authInterceptor, loggingInterceptor, errorInterceptor])),
		provideStore({ router: routerReducer }),
		provideRouterStore(),
		// NOTE(wasit): on NgRx official docs =>  'Although you can register reducers in the provideStore() function, we recommend keeping provideStore() empty and using the provideState() function to register feature states in the root providers array.',
		// Can refer => https://ngrx.io/guide/store/reducers
		provideState(authFeature),
		provideState(uiFeature),
		provideEffects(authEffects),
		provideStoreDevtools({
			maxAge: 25, // Retains last 25 states
			logOnly: !isDevMode(), // Restrict extension to log-only mode
			autoPause: true, // Pauses recording actions and state changes when the extension window is not open
			trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
			traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
			connectInZone: true, // If set to true, the connection is established within the Angular zone
		}),
		Constants,
		provideAnimationsAsync(),
		providePrimeNG({
			ripple: true,
			// TODO(wasit): review why aura theme is not working correctly at all places

			theme: {
				preset: Aura,
				options: {
					cssLayer: {
						name: 'primeng',
						order: 'app-styles, primeng, another-css-library',
					},
				},
			},
		}),
	],
};
