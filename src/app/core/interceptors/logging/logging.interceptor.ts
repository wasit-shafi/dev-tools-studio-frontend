import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (request, next) => {
	console.log('loggingInterceptor :: request.url : ', request.url);
	return next(request).pipe(
		tap((event) => {
			if (event.type === HttpEventType.Response) {
				console.log(request.url, 'returned a response with status', event.status);
			}
		})
	);
};
