import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatRadioChange } from '@angular/material/radio';
import swal from 'sweetalert2';
import { FacturasService } from '../services/facturas.service';

@Component({
  selector: 'app-detalle-factura',
  templateUrl: './detalle-factura.component.html',
  styleUrls: ['./detalle-factura.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DetalleFacturaComponent implements OnInit {


  @Input() detallFacturas:any
  @Input() payments:any
  @Output() request = new EventEmitter()
  seleccionado: any[] = [];
  detail: any[] = [];
  todos : boolean = false
  constructor(private _facturas:FacturasService) {

  }
  displayedColumnsFacturas: string[] = ['detalle'];
  displayedColumnsFacturasdetalle: string[] = ['select','description','value','suggestedValue'];
  columnsToDisplayWithExpand = [...this.displayedColumnsFacturas, 'expand'];
  expandedElement:  null | undefined;
  isModify : boolean = false

  ngOnInit(): void {

    let perfil = localStorage.getItem('profile')
    if(perfil === 'MODIFY'){
      this.isModify = true;
    }


  }


  GeneratePayableAcconting(elemt:any){

    let {factura_id,fechaFacturacion,version} = elemt
    let { code, group_id,paymentValue} = this.payments

      // if(this.seleccionado === undefined){

      //    swal.fire({
      //     icon:'info',
      //     text: 'Debe Selecccionar la factura a procesar'
      //   })
      //   return
      // }

      // this.seleccionado.forEach( (elemt) =>
      //   {

      //     this.detail.push(
      //       elemt.detail
      //     )
      //   }
      // )

    let req = {
      detail: this.seleccionado,
      // "invoices" :[
      //   {
      //     factura_id,
      //     fechaFacturacion,
      //     version,
      //   }
      // ],
      "payments" : [ {
        code,
        paymentValue

      }

    ],
    "GroupName" : group_id

    }
  console.log(req)
  this.request.emit(req)



  // this._facturas.GeneratePayableAcconting(req)
  // .subscribe(

  //   resp=> {

  //     let icono = ''

  //     if(resp.code === '200'){

  //       icono = 'success'
  //     }else{
  //       icono = 'error'
  //     }

  //     swal.fire({
  //       title: 'Proceso Terminado',
  //       text : resp.mensaje,
  //       icon : 'info'
  //     })
  //     this.seleccionado = []
  //     this._facturas.RecargarDetalle$.emit(true)

  //   }
  //   ,error => {

  //     this._facturas.logout()
  //   })



}

onChange(ob:any,item:any,element:any) {

    debugger


  if(ob.checked){
    console.log(item)
    console.log(element)
    this.seleccionado.push(item)
  }else{

    console.log(this.seleccionado)

    element.detail.forEach((factura:any) => {
      if(factura=== item){
        factura.seleccionado = false
      }
    })
    const aux = this.seleccionado.filter(value => value !== item )
    this.seleccionado = aux

  }
  // console.log(element)
  this.GeneratePayableAcconting(element)
  console.log(this.seleccionado)
}

seleccionarTodos(check:any,element:any,elementDetail:any){

  if(check.checked){



  elementDetail.forEach((facturaId:any,i:any) => {
    if(facturaId.factura_id === element.factura_id){
          facturaId.seleccionado = true
          this.seleccionado.push(
            facturaId
          )

    }
  });
  this.todos = true

  console.log(this.seleccionado)

}else{
  debugger
  this.todos = false

  // this.seleccionado = []
  // const aux = this.seleccionado.filter(value => value === elementDetail )

  elementDetail.forEach((element:any) => {
    this.seleccionado = this.eliminarSeleccion(element)

  });

  // this.seleccionado = aux
  elementDetail.forEach((facturaId:any,i:any) => {
    if(facturaId.factura_id === element.factura_id){
          facturaId.seleccionado = false
    }
  });
}
this.GeneratePayableAcconting(element)
console.log(this.seleccionado)
}


SaveLoadedInvoices(elemt:any){


  let {factura_id,fechaFacturacion,version,detail} = elemt

  let req = {
    "invoices" :[
      {
        factura_id,
        fechaFacturacion,
        version,
        detail
      }
    ]
  }
  this._facturas.SaveLoadedInvoices(req)
  .subscribe(

    resp=> {

      let icono = ''

      if(resp.code === '200'){

        icono = 'success'
      }else{
        icono = 'error'
      }

      swal.fire({
        title: 'Proceso Terminado',
        text : resp.mensaje,
        icon : 'info'
      })
    }
    ,error => {

      //this._facturas.logout()
    })
  }


  eliminarSeleccion(seleccion:any){

    const aux1 = this.seleccionado

    const aux = aux1.filter(value => value !== seleccion )

    return aux

  }


}
