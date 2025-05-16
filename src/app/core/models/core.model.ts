export interface IApiBaseResponse {
	code: number;
	success: boolean;
	message: string;
	data: unknown;
}

export interface IHasPermissionDirective {
	roles: number[];
	operation: string;
}
