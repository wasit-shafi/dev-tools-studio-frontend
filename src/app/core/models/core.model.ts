export interface IApiBaseResponse {
	code: number;
	success: boolean;
	message: string;
	data: unknown;
}
