import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HeaderService } from '../../shared/services/header.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({

    codigo:['', [Validators.required]],
    nombre:['', [Validators.required]],
    tipo:['', [Validators.required]],
   	tipo_asiento:['', [Validators.required]],
    concepto:['', [Validators.required]]	,
    codctaco:['', [Validators.required]]	,
    codsucur:['', [Validators.required]],
    codtipfu:['', [Validators.required]]	,
    numtipfu:['', [Validators.required]]	,
    codtipdc:['', [Validators.required]]	,
    numdocso:['', [Validators.required]],
    codlibro:['', [Validators.required]],
    esquemat:['', [Validators.required]]	,
    nivanal1:['', [Validators.required]]	,
    codniva1:['', [Validators.required]],
    formula:['', [Validators.required]]	,
    tipo_moneda:['', [Validators.required]],
    nivanal2:['', [Validators.required]]	,
    codniva2:['', [Validators.required]],
    codcompr:['', [Validators.required]],
    codopepr:['', [Validators.required]],
    nivanal3:['', [Validators.required]],
    codniva3:['', [Validators.required]],
    sort_order:['', [Validators.required]],
    contrato:['', [Validators.required]],
    activo:['', [Validators.required]]

  })

  constructor( @Inject(MAT_DIALOG_DATA) public data:any,
  public dialogRef: MatDialogRef<AgregarComponent> ,private fb: FormBuilder, private configuratiosServices:HeaderService) { }

  ngOnInit(): void {


  }
  crear(){
    this.configuratiosServices.create(this.miFormulario.value).subscribe( resp => {

      if( resp === null){

        swal.fire({
          icon: 'error',
          text : 'Error al Crear Entidad'
        })
      }else{
        this.dialogRef.close()
      }
    })
  }

  cerrar(){
    this.dialogRef.close();
  }

}
