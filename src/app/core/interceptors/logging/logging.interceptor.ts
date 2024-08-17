import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from '@environments/environment';

export const loggingInterceptor: HttpInterceptorFn = (request, next) => {
	if (environment.production) {
		return next(request);
	}

	console.log(
		`%c ${request.method} ${request.urlWithParams}`,
		'display: inline-block ; background-color: gold ; color: black ; font-weight: bold ; padding: 3px 7px 3px 7px ; border-radius: 3px 3px 3px 3px '
	);

	return next(request).pipe(
		tap((event) => {
			// console.log({ event });
			if (event.type === HttpEventType.Response) {
			}
		})
	);
};
