import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewLoginPageRoutingModule } from './new-login-routing.module';

import { NewLoginPage } from './new-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewLoginPageRoutingModule
  ],
  declarations: [NewLoginPage]
})
export class NewLoginPageModule {}
