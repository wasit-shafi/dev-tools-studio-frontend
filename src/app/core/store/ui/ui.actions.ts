import { createActionGroup, emptyProps } from '@ngrx/store';

export const uiActions = createActionGroup({
	source: 'Ui',
	events: {
		'Show Blocker': emptyProps(),
		'Hide Blocker': emptyProps(),
	},
});
