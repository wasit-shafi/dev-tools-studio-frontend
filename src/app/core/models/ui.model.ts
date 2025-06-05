export interface IBlocker {
	isVisible: boolean;
	primaryText: string;
	secondaryText?: string;
}

export interface ISettings {
	maskCredential: boolean;
}

export interface IUi {
	blocker: IBlocker;
	settings: ISettings;
}
