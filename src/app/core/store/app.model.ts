interface IUiBlocker {
	primaryText: string;
	secondaryText?: string;
}

export interface IApp {
	counterValue: number;
	uiBlocker: IUiBlocker;
}
