import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { MbscModule } from '@mobiscroll/angular';
import { AgregarHistoriaComponent } from './agregar-historia/agregar-historia.component';
import { AgregarExamenComponent } from './agregar-examen/agregar-examen.component';

@NgModule({
  declarations: [AgregarHistoriaComponent, AgregarExamenComponent],
  imports: [
    CommonModule, IonicModule, ReactiveFormsModule, MbscModule],
  exports: [AgregarHistoriaComponent, AgregarExamenComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
