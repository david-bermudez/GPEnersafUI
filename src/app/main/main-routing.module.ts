import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { ReporteComponent } from './reporte/reporte.component';

const routes: Routes = [
    {
      path:'',
      component:MainComponent,
      children: [

        { path: '**', redirectTo: 'inicio' },
      ],
    },
    { path: 'resultado', component : ReporteComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
