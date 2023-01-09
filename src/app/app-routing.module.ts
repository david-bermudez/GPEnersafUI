import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainModule } from './main/main.module';
import { PermitirGuard } from './guards/permitir.guard';

const routes: Routes = [


  {
    path:'auth',
    loadChildren : ()=> import('./auth/auth.module').then(m => m.AuthModule)
  },

  {
    path:'inicio',
    loadChildren : ()=> import('./main/main.module').then(m => m.MainModule),
    canActivate : [ PermitirGuard],
    canLoad : [PermitirGuard]
  },




  {
    path:'**',
    redirectTo:'auth'
  }

];

@NgModule({
  imports:[RouterModule.forRoot(routes,{
    useHash:false
  })],
  exports:[RouterModule]
})
export class AppRoutingModule { }
