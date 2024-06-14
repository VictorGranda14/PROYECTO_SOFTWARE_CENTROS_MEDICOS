import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ListadoExamenesComponent } from './listado-examenes/listado-examenes.component';
import { AgregarHistoriaComponent } from './agregar-historia/agregar-historia.component';

@NgModule({
  declarations: [ListadoExamenesComponent, AgregarHistoriaComponent],
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  exports: [ListadoExamenesComponent, AgregarHistoriaComponent]
})
export class ComponentsModule {}
