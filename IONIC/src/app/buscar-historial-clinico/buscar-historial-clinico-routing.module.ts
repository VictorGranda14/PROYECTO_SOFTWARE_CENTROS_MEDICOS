import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuscarHistorialClinicoPage } from './buscar-historial-clinico.page';

const routes: Routes = [
  {
    path: '',
    component: BuscarHistorialClinicoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuscarHistorialClinicoPageRoutingModule {}
