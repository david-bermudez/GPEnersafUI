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
  @Output() Sumatoria = new EventEmitter()
  suma : number = 0
  seleccionado: any[] = [];
  detail: any[] = [];
  todos : boolean = false
  romper: boolean = false;
  constructor(private _facturas:FacturasService) {

  }
  displayedColumnsFacturas: string[] = ['detalle','totalFactura','Estado'];
  displayedColumnsFacturasdetalle: string[] = ['select','description','value','suggestedValue'];
  columnsToDisplayWithExpand = [...this.displayedColumnsFacturas, 'expand'];
  expandedElement:  null | undefined;
  isModify : boolean = false;
  public menus:any[] = [];

  ngOnInit(): void {

    let perfil = localStorage.getItem('profile')
    if(perfil === 'MODIFY'){
      this.isModify = true;
    }

    this._facturas.RecargarDetalle$.subscribe(
      resp => {

        this.seleccionado = []
      }
    )
    this._facturas.calcular$.subscribe(
      resp => {



            this.detallFacturas.forEach((element:any) => {


                this.autoCheck(resp[0],element,element.detail,resp[1])

            });

      }
    )


  }


  GeneratePayableAcconting(elemt:any){

    let {factura_id,fechaFacturacion,version} = elemt
    let { code, group_id,paymentValue} = this.payments

    let req = {
      detail: this.seleccionado,

      "payments" : [ {
        code,
        paymentValue

      }

    ],
    "GroupName" : group_id

    }
  console.log(req)
  this.request.emit(req)


}

onChange(ob:any,item:any,element:any) {

    debugger


  if(ob.checked){
    console.log(item)
    console.log(element)
    this.suma = this.suma+item.value
    this.seleccionado.push(item)
  }else{

    console.log(this.seleccionado)

    element.detail.forEach((factura:any) => {
      if(factura=== item){
        factura.seleccionado = false
        this.suma = this.suma-factura.value
      }
    })
    const aux = this.seleccionado.filter(value => value !== item )
    this.seleccionado = aux

  }
  // console.log(element)
  this.Sumatoria.emit(this.suma)
  this.GeneratePayableAcconting(element)
  console.log(this.seleccionado)
}


cambio(event:any){
  console.log(event)
}

seleccionarTodos(check:any,element:any,elementDetail:any){

  if(check.checked){



  elementDetail.forEach((facturaId:any,i:any) => {
    if(facturaId.factura_id === element.factura_id){
          facturaId.seleccionado = true

          this.seleccionado.push(
            facturaId
          )
          debugger
          this.suma = this.suma+facturaId.value


    }
  });
  this.todos = true

  console.log(this.seleccionado)
  console.log(this.suma)
  // this.Sumatoria.emit(this.suma)

}else{
  debugger
  this.todos = false

  elementDetail.forEach((facturaId:any,i:any) => {
    if(facturaId.factura_id === element.factura_id){
          facturaId.seleccionado = true

          this.seleccionado.push(
            facturaId
          )
          if(this.suma !== 0){

            this.suma = this.suma-facturaId.value
          }


    }
  });




  elementDetail.forEach((element:any) => {
    this.seleccionado = this.eliminarSeleccion(element)

  });


  elementDetail.forEach((facturaId:any,i:any) => {
    if(facturaId.factura_id === element.factura_id){
          facturaId.seleccionado = false
    }
  });
}
this.Sumatoria.emit(this.suma)
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

      this._facturas.logout()
    })
  }


  eliminarSeleccion(seleccion:any){

    const aux1 = this.seleccionado

    const aux = aux1.filter(value => value !== seleccion )

    return aux

  }

  obtenerErrorFactura(factura : any){
    debugger;
    this._facturas.GetErrorInvoicePay(factura).subscribe( resp => {
      swal.fire({
        title : resp.mensaje,
        icon : 'warning',
      })
    },error => {

      this._facturas.logout()
    })

  }

  ObtenerOpcionesMenu(factura : any){
    this._facturas.GenerateMenuInvoicesPay(factura)
    .subscribe( resp =>
      {
        this.menus =resp
        console.log(this.menus)
      }
      )

  }

  autoCheck(check:any,element:any,elementDetail:any,saldo:any){

    if(check){

      let restante = 0

    elementDetail.forEach((facturaId:any,i:any) => {
      if(facturaId.factura_id === element.factura_id && !this.romper){

        restante = saldo - this.suma
        if((this.suma + facturaId.value) < saldo){
          console.log('hola')
          console.log(i)
          // debugger
          if( facturaId.value  === 23567827903	){
            console.log('oe')
          }
          facturaId.seleccionado = true
          element.seleccionado = true
          // document.getElementById().checked = true

          this.seleccionado.push(
            facturaId
          )
          this.suma = this.suma+facturaId.value
        }else{
          debugger
          console.log(12345)
          this.romper = true
          return
        }


      }
    });
    this.todos = true

    console.log(this.seleccionado)
    console.log(this.suma)
    // this.Sumatoria.emit(this.suma)

  }else{
    debugger
    this.todos = false

    elementDetail.forEach((facturaId:any,i:any) => {
      if(facturaId.factura_id === element.factura_id){
            facturaId.seleccionado = true

            this.seleccionado.push(
              facturaId
            )
            if(this.suma !== 0){

              this.suma = this.suma-facturaId.value
            }


      }
    });




    elementDetail.forEach((element:any) => {
      this.seleccionado = this.eliminarSeleccion(element)

    });


    elementDetail.forEach((facturaId:any,i:any) => {
      if(facturaId.factura_id === element.factura_id){
            facturaId.seleccionado = false
          element.seleccionado = false
      }
    });
  }
  this.Sumatoria.emit(this.suma)
  this.GeneratePayableAcconting(element)
  console.log(this.seleccionado)
  }



}
