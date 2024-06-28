import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { AgregarHistoriaComponent } from './agregar-historia/agregar-historia.component';
import { AgregarExamenComponent } from './agregar-examen/agregar-examen.component';
import { HeaderComponent } from './header/header.component';
import { VerExamenComponent } from './ver-examen/ver-examen.component';
import { AgendarCitaComponent } from './agendar-cita/agendar-cita.component';
import { VerCitasFuncionarioComponent } from './ver-citas-funcionario/ver-citas-funcionario.component';

@NgModule({

  declarations: [
    AgregarHistoriaComponent, 
    AgregarExamenComponent, 
    HeaderComponent, 
    VerExamenComponent, 
    AgendarCitaComponent, 
    VerCitasFuncionarioComponent
  ],

  imports: [
    CommonModule, IonicModule, ReactiveFormsModule
  ],

  exports: [
    AgregarHistoriaComponent, 
    AgregarExamenComponent, 
    HeaderComponent, 
    VerExamenComponent, 
    AgendarCitaComponent, 
    VerCitasFuncionarioComponent
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}