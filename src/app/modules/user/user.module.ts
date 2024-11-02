import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

import { UserRoutingModule } from './user-routing.module';

@NgModule({
	declarations: [],
	imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
