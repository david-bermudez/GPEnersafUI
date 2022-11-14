import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HeaderService } from '../../shared/services/header.service';
import { AgregarComponent } from '../agregar/agregar.component';

@Component({
  selector: 'app-detalle-error',
  templateUrl: './detalle-error.component.html',
  styleUrls: ['./detalle-error.component.css']
})
export class DetalleErrorComponent implements OnInit {
  isModify : boolean = false
  cabeceraTabla = ['codigo',	'nombre'	,'tipo',	'tipo_asiento',	'concepto'	,'codctaco'	,'codsucur',	'codtipfu'	,'numtipfu'	,'codtipdc'	,'numdocso',	'codlibro',	'esquemat'	,'nivanal1'	,'codniva1',	'formula'	,'tipo_moneda',	'nivanal2'	,'codniva2',	'codcompr',	'codopepr',	'nivanal3',	'codniva3',	'sort_order',	'contrato', 'activo']
  bodyTabla:any = []
  constructor(@Inject(MAT_DIALOG_DATA) public data:any ,
   public configuracionService:HeaderService , public dialogo:MatDialog,
   public dialogRef: MatDialogRef<DetalleErrorComponent>) { }

  ngOnInit(): void {

    this.obtenerListado()

    let perfil = localStorage.getItem('profile')
    if(perfil === 'MODIFY'){
      this.isModify = true;
    }
  }

  modificar(elemento:any){
     this.configuracionService.update(elemento)
     .subscribe( resp => {
      console.log(resp)
      this.obtenerListado
     })
  }

  obtenerListado(){
    this.configuracionService.GetInfo().subscribe( resp => this.bodyTabla = resp)
  }

  nuevo(){

    const conf =this.dialogo.open(AgregarComponent, {
      width:'1000px',
      height:'800px',

    });

    conf.afterClosed()
          .subscribe( (result) => {

              this.obtenerListado();

          });
  }

  cerrar(){
    this.dialogRef.close()
  }

}
