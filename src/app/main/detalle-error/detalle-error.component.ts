import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HeaderService } from '../../shared/services/header.service';

@Component({
  selector: 'app-detalle-error',
  templateUrl: './detalle-error.component.html',
  styleUrls: ['./detalle-error.component.css']
})
export class DetalleErrorComponent implements OnInit {

  cabeceraTabla = ['codigo',	'nombre'	,'tipo',	'tipo_asiento',	'concepto'	,'codctaco'	,'codsucur',	'codtipfu'	,'numtipfu'	,'codtipdc'	,'numdocso',	'codlibro',	'esquemat'	,'nivanal1'	,'codniva1',	'formula'	,'tipo_moneda',	'nivanal2'	,'codniva2',	'codcompr',	'codopepr',	'nivanal3',	'codniva3',	'sort_order',	'contrato', 'activo']
  bodyTabla:any = []
  constructor(@Inject(MAT_DIALOG_DATA) public data:any , public configuracionService:HeaderService) { }

  ngOnInit(): void {

    this.configuracionService.GetInfo().subscribe( resp => this.bodyTabla = resp)
  }

}
