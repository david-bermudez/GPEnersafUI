import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [ {
  path: '',
  component : LoginComponent,
  children: [
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: 'login' },
  ]


}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthRoutingModule { }


