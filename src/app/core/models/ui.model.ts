interface IBlocker {
	isVisible: boolean;
	primaryText: string;
	secondaryText?: string;
}

export interface IUi {
	blocker: IBlocker;
}
