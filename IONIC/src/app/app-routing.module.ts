import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

//Componentes
import { AgregarHistoriaComponent } from './components/agregar-historia/agregar-historia.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'agendar-hora',
    loadChildren: () => import('./pages/agendar-hora/agendar-hora.module').then(m => m.AgendarHoraPageModule)
  },
  {
    path: 'buscar-examen',
    loadChildren: () => import('./pages/buscar-examen/buscar-examen.module').then(m => m.BuscarExamenPageModule)
  },
  {
    path: 'buscar-historial-clinico',
    loadChildren: () => import('./pages/buscar-historial-clinico/buscar-historial-clinico.module').then( m => m.BuscarHistorialClinicoPageModule)
  },
  {
    path: 'agregar-historia', 
    component: AgregarHistoriaComponent
  },
  {
    path: 'home-admin',
    loadChildren: () => import('./pages/home-admin/home-admin.module').then( m => m.HomeAdminPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
