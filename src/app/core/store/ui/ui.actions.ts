import { createActionGroup, emptyProps } from '@ngrx/store';

export const uiActions = createActionGroup({
	source: 'Ui',
	events: {
		'Blocker Show': emptyProps(),
		'Blocker Hide': emptyProps(),
	},
});
