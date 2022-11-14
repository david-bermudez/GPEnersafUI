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

    this.seleccionado.forEach( (elemts) =>
      {
        console.log(elemts)
        elemts.detail.forEach ( (invoiceItem: any ) => {
          this.detail.push( invoiceItem )
        })
      }
    )

    let req = {
      "detail": this.detail,
      "payments" : [ {code,paymentValue}],
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
  if(ob.checked){

    this.seleccionado.push(item)
  }else{

    const aux = this.seleccionado.filter(value => value !== item )


    // console.log(aux)


    this.seleccionado = aux

  }
  console.log(element)
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
seleccionarTodos(check:any,element:any){
  if(check.checked){


    this.seleccionado = []
    this.seleccionado = this.detallFacturas
    this.todos = true
  }else{
    this.seleccionado = []
    this.todos = false
  }
  this.GeneratePayableAcconting(element)
  console.log(this.seleccionado)
}

}
