import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DetalleFactura } from '../interfaces/factura.interfaces';
import { FacturasService } from '../services/facturas.service';
import swal from 'sweetalert2';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

@Component({
  selector: 'app-historial-facturas',
  templateUrl: './historial-facturas.component.html',
  styleUrls: ['./historial-facturas.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class HistorialFacturasComponent  {
  dataSource :any;
  displayedColumns = ['Cliente','getdetails'];
  displayedColumnsItems: string[] = ['select','Consecutivo','Codigo','Valor', 'FechaIngreso'];
  displayedColumnsFacturas: string[] = ['Descripcion','actions'];
  displayedColumnsFacturasdetalle: string[] = ['description','value','suggestedValue'];
  displayedColumnsFacturasdetalleWithExpand = [...this.displayedColumnsFacturasdetalle, 'expand'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement:  null | undefined;
  expandedElementDetalle:  null | undefined;

  @Input() perido : any ;
  @Input() payments :string = '' ;

  public facturacion:any[] = []
  public detalleEmpresa!:DetalleFactura
  public detallPagos:any[] = []
  public detallFacturas:any[] = []
  detailinvioces: any;
  selected = -1

  valor!: number
  sumatoria: any = 0;

  constructor( public _facturas:FacturasService){

    this._facturas.GetLoadedInvoiceByCompany()
    .subscribe( resp =>{


        this.facturacion = resp.data


  }

  )


  }

  ngOnInit() {

    this._facturas.RecargarDetalle$.subscribe(
      resp => {

        if(resp){
          debugger
          this._facturas.GetLoadedInvoicesDummie()
        }
      }
    )

  }

  expandedSymbol: string = '';
  toggleExpandableSymbol(symbol: string): void {
    console.log(symbol)

    this.expandedSymbol = this.expandedSymbol === symbol
      ? ''
      : symbol;
  }





  obtenerItems(empresa:any){


    let fecha = new Date(this.perido)
    let year  = fecha.getFullYear()
    let month = fecha.getMonth() + 1
    let period = year + month.toString().padStart(2,"0");

    this._facturas.GetLoadedInvoices(empresa,period.toString())
    .subscribe(resp => {
      console.log(resp)
        this.detalleEmpresa = resp
        this.detallPagos = resp.payments
        this.detallFacturas = resp.invoices
    },error => {

      this._facturas.logout()
    })

    // this._facturas.GetLoadedInvoicesDummie()
    // .subscribe( resp => {
    //    this.detalleEmpresa = resp
    //     this.detallPagos = resp.payments
    //    this.detallFacturas = resp.invoices

    //   })




  }

  onChange(ob:any,elem:string,index:number){

    if(ob.checked){
      this.payments = elem

      // this.sumatoria = this.sumatoria+valor
      // this.selected = index
    }else{


      // const aux = this.payments.filter( item => item !== elem)

      this.payments = ''
    }
    this.checkUnCheck(index)
    console.log(this.payments,this.sumatoria,index)
  }



  checkUnCheck(index:number){

    this.selected = index
  }






}

