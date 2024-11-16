import { createActionGroup, emptyProps } from '@ngrx/store';

export const uiActions = createActionGroup({
	source: 'Ui',
	events: {
		showBlocker: emptyProps(),
		hideBlocker: emptyProps(),
	},
});
