import { providePrimeNG } from 'primeng/config';
import { catchError, firstValueFrom, of, tap } from 'rxjs';

import { isPlatformBrowser } from '@angular/common';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import {
	ApplicationConfig,
	inject,
	isDevMode,
	PLATFORM_ID,
	provideAppInitializer,
	provideZoneChangeDetection,
} from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, Router } from '@angular/router';
import { authInterceptor, errorInterceptor, loggingInterceptor } from '@coreInterceptors/';
import { PersistenceService } from '@coreServices/';
import { Constants } from '@coreShared/';
import { authActions, authFeature, uiFeature } from '@coreStore/';
import * as authEffects from '@coreStore/auth/auth.effects';
import * as uiEffects from '@coreStore/ui/ui.effect';
import { environment } from '@environments/';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideState, provideStore, Store } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import Aura from '@primeng/themes/aura';
import { userFeature } from '@userStore/';
import * as userEffects from '@userStore/user/user.effects';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideAppInitializer(() => {
			const constants = inject(Constants);
			const http = inject(HttpClient);
			const persistenceService = inject(PersistenceService);
			const router = inject(Router);
			const store = inject(Store);
			const platformId = inject(PLATFORM_ID);

			if (isPlatformBrowser(platformId)) {
				http.get(constants.IPINFO_ENDPOINT).subscribe({
					next: (response) => {
						http
							.post(`${environment.baseUrl}/${constants.API_PREFIX.API_V1}/visitor-alert`, {
								ipInfoFromClient: response,
							})
							.subscribe();
					},
					error: (error) => {
						console.log('Error while fetching ipInfo :: ', error);
						http
							.post(`${environment.baseUrl}/${constants.API_PREFIX.API_V1}/visitor-alert`, {
								ipInfoFromClient: {
									message: 'Unable to fetch IP Info from client',
								},
							})
							.subscribe();
					},
					complete: () => {},
				});
			}

			// NOTE(Wasit): if there is no tokens then assuming user was not logged in previously

			if (
				!persistenceService.get(constants.LOCAL_STORAGE_KEYS.ACCESS_TOKEN) ||
				!persistenceService.get(constants.LOCAL_STORAGE_KEYS.REFRESH_TOKEN)
			) {
				return of(null);
			}

			return firstValueFrom(
				// Attempt 1: Auto Signin with using accessToken

				http.get(`${environment.baseUrl}/${constants.API_PREFIX.API_V1}/auth/me`).pipe(
					tap((response: any) => {
						store.dispatch(authActions.autoSigninSuccess({ currentUser: response?.data?.user }));
					}),
					catchError((error) => {
						// Attempt 2: Auto Signin with using refreshToken

						// NOTE(Wasit): the auth interceptor with inject the refreshToken for API endpoint ending with '*/auth/refresh'

						return http.post(`${environment.baseUrl}/${constants.API_PREFIX.API_V1}/auth/refresh`, {}).pipe(
							tap((response: any) => {
								store.dispatch(authActions.autoSigninSuccess({ currentUser: response?.data?.user }));
							}),
							catchError((error) => {
								// Assuming the refresh token has also expired

								persistenceService.remove(constants.LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
								persistenceService.remove(constants.LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
								// TODO: remove/delete the cookies as from the browser + also check if the new assess and refresh token is getting saved or not in redux state

								router.navigate([constants.ROUTES.ROOT]);
								return of(null);
							})
						);
					})
				)
			);
		}),
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideClientHydration(),
		provideHttpClient(withFetch(), withInterceptors([authInterceptor, loggingInterceptor, errorInterceptor])),
		provideStore({ router: routerReducer }),
		provideRouterStore(),
		// NOTE(WASIT): on NgRx official docs =>  'Although you can register reducers in the provideStore() function, we recommend keeping provideStore() empty and using the provideState() function to register feature states in the root providers array.',
		// Can refer => https://ngrx.io/guide/store/reducers
		provideState(authFeature),
		provideState(uiFeature),
		provideState(userFeature),
		provideEffects(authEffects),
		provideEffects(uiEffects),
		provideEffects(userEffects),
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
			theme: {
				preset: Aura,
			},
		}),
	],
};
