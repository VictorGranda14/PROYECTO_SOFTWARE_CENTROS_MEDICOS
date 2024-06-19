import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscarExamenPageRoutingModule } from './buscar-examen-routing.module';

import { BuscarExamenPage } from './buscar-examen.page';

import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscarExamenPageRoutingModule
  ],
  declarations: [BuscarExamenPage]
})
export class BuscarExamenPageModule {}
