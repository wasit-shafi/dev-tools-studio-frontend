import { HttpErrorResponse } from '@angular/common/http';

interface CustomErrorResponse {
	code: number;
	data: unknown;
	message: string;
}

interface CustomHttpErrorResponse extends HttpErrorResponse {
	error: CustomErrorResponse;
}

export { CustomHttpErrorResponse };
