export class Constants {
	public readonly projectName = 'Dev Tools Studio';

	public readonly API: Record<string, string> = {
		_V1: '/v1',
		_V2: '/v2',
	};

	public readonly ROUTES: Record<string, string> = {
		// GUEST USER ROUTES (UN-PROTECTED)

		CONTACT: 'contact',
		RESET_PASSWORD: 'rest-password',
		ROOT: '',
		SIGNIN: 'signin',
		SIGNUP: 'signup',

		// LOGGED-IN USER ROUTES (PROTECTED)

		DASHBOARD: 'dashboard',
		SETTINGS: 'settings',

		// ADMIN ROUTES (PROTECTED)

		CONTROL_PANEL: 'control-panel',

		// OTHERS

		UNKNOWN: 'test-random-unknown-url',
	};
}
