import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
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
export class DetalleFacturaComponent {


  @Input() detallFacturas:any
  constructor(private _facturas:FacturasService) { }
  displayedColumnsFacturas: string[] = ['detalle','actions'];
  displayedColumnsFacturasdetalle: string[] = ['description','value','suggestedValue'];
  columnsToDisplayWithExpand = [...this.displayedColumnsFacturas, 'expand'];
  expandedElement:  null | undefined;

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
  console.log(req)

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
  )



}
GeneratePayableAcconting(elemt:any){


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
  this._facturas.GeneratePayableAcconting(req)
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
  )
}


}
