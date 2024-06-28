import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscarHistorialClinicoPageRoutingModule } from './buscar-historial-clinico-routing.module';

import { BuscarHistorialClinicoPage } from './buscar-historial-clinico.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    BuscarHistorialClinicoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [BuscarHistorialClinicoPage]
})
export class BuscarHistorialClinicoPageModule {}
