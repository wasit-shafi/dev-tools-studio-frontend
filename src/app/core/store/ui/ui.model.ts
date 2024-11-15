interface IBlocker {
	primaryText: string;
	secondaryText?: string;
}

export interface IUi {
	blocker: IBlocker;
}
