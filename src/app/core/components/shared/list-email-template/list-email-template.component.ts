import { AsyncPipe } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { EditEmailTemplateComponent } from '@coreComponents/';
import { Constants } from '@coreShared/';
import { Store } from '@ngrx/store';
import { IEmailTemplateData } from '@userModels/';
import { userActions, userFeature } from '@userStore/';

@Component({
	selector: 'dts-list-email-template',
	imports: [AsyncPipe, EditEmailTemplateComponent],
	templateUrl: './list-email-template.component.html',
	styleUrl: './list-email-template.component.scss',
})
export class ListEmailTemplateComponent {
	@ViewChild('editEmailTemplateComponent') editEmailTemplateComponent!: EditEmailTemplateComponent;

	protected readonly constants = inject(Constants);
	private readonly store = inject(Store);
	protected emailTemplateList$ = this.store.select(userFeature.selectEmailTemplateList);

	ngOnInit(): void {
		this.store.dispatch(userActions.getEmailTemplateList());
	}

	protected handleEditEmailTemplate(emailTemplate: IEmailTemplateData): void {
		this.editEmailTemplateComponent.handleOnModalOpen({ ...emailTemplate });
	}

	protected handleDeleteEmailTemplate(_id: string): void {
		this.store.dispatch(userActions.deleteEmailTemplate({ _id }));
	}
}
