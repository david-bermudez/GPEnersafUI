import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { FacturasComponent } from './facturas/facturas.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material/material.module';
import { DetalleErrorComponent } from './detalle-error/detalle-error.component';
import { HistorialFacturasComponent } from './historial-facturas/historial-facturas.component';
import { MainComponent } from './main/main.component';
import { FormsModule } from '@angular/forms';
import { DetalleFacturaComponent } from './detalle-factura/detalle-factura.component';


@NgModule({
  declarations: [
    FacturasComponent,
    HistorialFacturasComponent,
    MainComponent,
    DetalleFacturaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MainRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class MainModule { }
