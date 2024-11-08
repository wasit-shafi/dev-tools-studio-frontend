export class Constants {
	public readonly PROJECT_NAME = 'Dev Tools Studio';

	public readonly API: Record<string, string> = {
		_V1: '/v1',
		_V2: '/v2',
	} as const;

	public readonly REGEX = {
		EMAIL: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$',
	};

	private readonly ROUTES_PATHS: Record<string, string> = {
		// GUEST USER ROUTES (UN-PROTECTED)

		CONTACT: 'contact',
		RESET_PASSWORD: 'reset-password',
		ROOT: '',
		SIGNIN: 'signin',
		SIGNUP: 'signup',
		// LOGGED-IN USER ROUTES (PROTECTED)

		DASHBOARD: 'dashboard',
		SETTINGS: 'settings',
		// ADMIN ROUTES (PROTECTED)

		CONTROL_PANEL: 'control-panel',
	};

	public readonly ROUTES: Record<string, string> = {
		// GUEST USER ROUTES (UN-PROTECTED)

		CONTACT: this.ROUTES_PATHS.CONTACT,
		RESET_PASSWORD: this.ROUTES_PATHS.RESET_PASSWORD,
		ROOT: this.ROUTES_PATHS.ROOT,
		SIGNIN: this.ROUTES_PATHS.SIGNIN,
		SIGNUP: this.ROUTES_PATHS.SIGNUP,
		_CONTACT: `/${this.ROUTES_PATHS.CONTACT}`,
		_RESET_PASSWORD: `/${this.ROUTES_PATHS.RESET_PASSWORD}`,
		_SIGNIN: `/${this.ROUTES_PATHS.SIGNIN}`,
		_SIGNUP: `/${this.ROUTES_PATHS.SIGNUP}`,
		// LOGGED-IN USER ROUTES (PROTECTED)

		DASHBOARD: this.ROUTES_PATHS.DASHBOARD,
		SETTINGS: this.ROUTES_PATHS.SETTINGS,
		_DASHBOARD: `/${this.ROUTES_PATHS.DASHBOARD}`,
		_SETTINGS: `/${this.ROUTES_PATHS.SETTINGS}`,
		// ADMIN ROUTES (PROTECTED)

		CONTROL_PANEL: this.ROUTES_PATHS.CONTROL_PANEL,
		_CONTROL_PANEL: `/${this.ROUTES_PATHS.CONTROL_PANEL}`,
	} as const;

	public readonly HTTP_STATUS_CODES_RANGES: Record<string, number> = {
		MIN_INFORMATION: 100,
		MAX_INFORMATION: 199,

		MIN_SUCCESSFUL: 200,
		MAX_SUCCESSFUL: 299,

		MIN_REDIRECTION: 300,
		MAX_REDIRECTION: 399,

		MIN_CLIENT_ERROR: 400,
		MAX_CLIENT_ERROR: 499,

		MIN_SERVER_ERROR: 500,
		MAX_SERVER_ERROR: 599,
	} as const;

	public readonly HTTP_STATUS_CODES: Record<string, Record<string, number>> = {
		// Information - 1XX

		INFORMATIONAL: {
			CREATED: 100,
		},
		// Successful - 2XX

		SUCCESSFUL: {
			OK: 200,
			CREATED: 201,
			ACCEPTED: 202,
			NO_CONTENT: 204,
		},
		// Redirection - 3XX

		REDIRECTION: {},
		// Client Error - 4XX

		CLIENT_ERROR: {
			BAD_REQUEST: 400,
			UNAUTHORIZED: 401,
			NOT_FOUND: 404,
			CONFLICT: 409,
			TOO_MANY_REQUESTS: 429,
		},
		// Server Error - 5XX

		SERVER_ERROR: {
			INTERNAL_SERVER_ERROR: 500,
			SERVICE_UNAVAILABLE: 503,
		},
	} as const;

	public readonly ALERT_TYPE = {
		VOID: '',
		INFO: 'alert-info',
		SUCCESS: 'alert-success',
		WARNING: 'alert-warning',
		ERROR: 'alert-error',
	} as const;

	public readonly LOCAL_STORAGE_KEYS = {
		ACCESS_TOKEN: 'ACCESS_TOKEN',
		REFRESH_TOKEN: 'REFRESH_TOKEN',
	} as const;

	public readonly USER_ROLES: Record<string, number> = {
		SUPER_ADMIN: 1,
		ADMIN: 2,
		APP_USER: 3,
	} as const;

	public readonly BROADCAST_CHANNELS = {
		USER: {
			CHANNEL_NAME: 'USER_EVENTS_CHANNEL',
			EVENTS: {
				SIGNOUT: 'SIGNOUT',
			},
		},
	} as const;
}
