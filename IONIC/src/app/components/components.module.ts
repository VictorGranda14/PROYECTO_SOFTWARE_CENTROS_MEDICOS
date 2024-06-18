import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { AgregarHistoriaComponent } from './agregar-historia/agregar-historia.component';
import { AgregarExamenComponent } from './agregar-examen/agregar-examen.component';

@NgModule({
  declarations: [AgregarHistoriaComponent, AgregarExamenComponent],
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  exports: [AgregarHistoriaComponent, AgregarExamenComponent]
})
export class ComponentsModule {}
