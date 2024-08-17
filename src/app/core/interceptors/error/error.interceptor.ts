import { catchError, tap, throwError } from 'rxjs';

import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';

export const errorInterceptor: HttpInterceptorFn = (request, next) => {
	return next(request).pipe(
		tap((event) => {}),
		catchError((error: HttpErrorResponse) => {
			const message = `${error.error?.message || error.message} (Code: ${error.status})`;
			console.error(
				`%c ${message}`,
				'display: inline-block ; background-color: red ; color: black ; font-weight: bold ; padding: 3px 7px 3px 7px ; border-radius: 3px 3px 3px 3px '
			);
			// toastService.enqueueToastNotification({ message, type: constants.ALERT_TYPE.ERROR });
			// if (
			// 	error.status >= constants.HTTP_STATUS_CODES_RANGES.MIN_CLIENT_ERROR &&
			// 	error.status <= constants.HTTP_STATUS_CODES_RANGES.MAX_CLIENT_ERROR
			// ) {
			// } else if (
			// 	error.status >= constants.HTTP_STATUS_CODES_RANGES.MIN_SERVER_ERROR &&
			// 	error.status <= constants.HTTP_STATUS_CODES_RANGES.MAX_SERVER_ERROR
			// ) {
			// } else {
			// 	console.log('something went wrong...');
			// }

			return throwError(error);
		})
	);
};
