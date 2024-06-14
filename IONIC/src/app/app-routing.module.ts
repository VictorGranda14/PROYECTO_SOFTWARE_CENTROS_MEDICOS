import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AgregarHistoriaComponent } from './components/agregar-historia/agregar-historia.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'agendar-hora',
    loadChildren: () => import('./agendar-hora/agendar-hora.module').then(m => m.AgendarHoraPageModule)
  },
  {
    path: 'buscar-examen',
    loadChildren: () => import('./buscar-examen/buscar-examen.module').then(m => m.BuscarExamenPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'buscar-historial-clinico',
    loadChildren: () => import('./buscar-historial-clinico/buscar-historial-clinico.module').then( m => m.BuscarHistorialClinicoPageModule)
  },
  {
    path: 'agregar-historia', 
    component: AgregarHistoriaComponent
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
