import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuscarExamenPage } from './buscar-examen.page';

const routes: Routes = [
  {
    path: '',
    component: BuscarExamenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuscarExamenPageRoutingModule {}
