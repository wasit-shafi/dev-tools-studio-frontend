import { createActionGroup, emptyProps } from '@ngrx/store';

export const appActions = createActionGroup({
	source: 'App',
	events: {
		'Ui Blocker Show': emptyProps(),
		'Ui Blocker Hide': emptyProps(),
	},
});
