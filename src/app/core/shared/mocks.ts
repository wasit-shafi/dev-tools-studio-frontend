export class Mocks {
	private readonly mockRoutesData: any = {
		// guest user routes

		guestUserRoutes: {
			routeList: [
				{ url: '', text: 'Home' },
				{ url: 'contact', text: 'Contact' },
				{ url: 'signup', text: 'Sign Up' },
				{ url: 'signin', text: 'Sign In' },
				{ url: 'forgot-password', text: 'Forgot Password' },
				{ url: 'reset-password', text: 'Reset Password' },
			],
			className: 'text-green-500 hover:bg-sky-400 hover:text-stone-600',
		},
		// regular user routes

		regularUserRoutes: {
			routeList: [
				{ url: 'dashboard', text: 'Dashboard' },
				{ url: 'settings', text: 'Settings' },
			],
			className: 'text-red-500 hover:bg-sky-400 hover:text-stone-600',
		},
		// admin user routes

		adminUserRoutes: {
			routeList: [{ url: 'control-panel', text: 'Control Panel' }],
			className: 'text-purple-500 hover:bg-sky-400 hover:text-stone-600',
		},
		// other routes

		otherRoutes: {
			routeList: [{ url: 'sample-random-url', text: 'Random Url' }],
			className: 'text-lime-500 hover:bg-sky-400 hover:text-stone-600',
		},
	};
	// transforming mockRouteData

	public readonly mockRoutes = [
		...this.mockRoutesData.guestUserRoutes.routeList.map((item: any) => {
			return { ...item, className: this.mockRoutesData.guestUserRoutes.className };
		}),
		...this.mockRoutesData.regularUserRoutes.routeList.map((item: any) => {
			return { ...item, className: this.mockRoutesData.regularUserRoutes.className };
		}),
		...this.mockRoutesData.adminUserRoutes.routeList.map((item: any) => {
			return { ...item, className: this.mockRoutesData.adminUserRoutes.className };
		}),
		...this.mockRoutesData.otherRoutes.routeList.map((item: any) => {
			return { ...item, className: this.mockRoutesData.otherRoutes.className };
		}),
	];
}
