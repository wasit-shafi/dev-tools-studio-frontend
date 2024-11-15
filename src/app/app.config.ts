import { provideLottieOptions } from 'ngx-lottie';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { authInterceptor, loggingInterceptor } from '@coreInterceptors/';
import { errorInterceptor } from '@coreInterceptors/error/error.interceptor';
import { Constants } from '@coreShared/';
import * as authEffects from '@coreStore/auth/auth.effects';
import { authFeature, uiFeature } from '@coreStore/';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

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
		provideStoreDevtools({
			maxAge: 25, // Retains last 25 states
			logOnly: !isDevMode(), // Restrict extension to log-only mode
			autoPause: true, // Pauses recording actions and state changes when the extension window is not open
			trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
			traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
			connectInZone: true, // If set to true, the connection is established within the Angular zone
		}),
		provideState(authFeature),
		provideState(uiFeature),
		provideEffects(authEffects),
		Constants,
	],
};
