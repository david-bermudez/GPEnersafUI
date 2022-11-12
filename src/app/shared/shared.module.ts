import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../material/material/material.module';
import { DetalleErrorComponent } from '../main/detalle-error/detalle-error.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [HeaderComponent,DetalleErrorComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule

  ],
  exports:[HeaderComponent]
})
export class SharedModule { }
