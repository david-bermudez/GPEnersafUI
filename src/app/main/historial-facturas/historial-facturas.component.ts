import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DetalleFactura } from '../interfaces/factura.interfaces';
import { FacturasService } from '../services/facturas.service';

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
  displayedColumnsItems: string[] = ['Consecutivo','Codigo','Valor', 'Fecha Ingreso'];
  displayedColumnsFacturas: string[] = ['Descripcion','actions'];
  displayedColumnsFacturasdetalle: string[] = ['id','description','value','suggestedValue'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement:  null | undefined;

  @Input() perido : any ;

  public facturacion:any[] = []
  public detalleEmpresa!:DetalleFactura
  public detallPagos:any[] = []
  public detallFacturas:any[] = []
  detailinvioces: any;

  valor!: number

  constructor( public _facturas:FacturasService){

    this._facturas.GetLoadedInvoiceByCompany()
    .subscribe( resp =>
        this.facturacion = resp.data
      )
  }

  ngOnInit() {

  }

  expandedSymbol: string = '';
  toggleExpandableSymbol(symbol: string): void {
    console.log(symbol)

    this.expandedSymbol = this.expandedSymbol === symbol
      ? ''
      : symbol;
  }


  guardar(elemtn:any){

    console.log(elemtn)
  }

  confirmar(elemtn:any){

    console.log(elemtn)
  }


  obtenerItems(empresa:any){

    // this._facturas.GetLoadedInvoices(empresa,periodo)
    // .subscribe(resp => {
    //   console.log(resp)
    //     this.detalleEmpresa = resp
    //     this.detallPagos = resp.payments
    //     this.detallFacturas = resp.invoices
    // })

    this._facturas.GetLoadedInvoicesDummie()
    .subscribe( resp => {
       this.detalleEmpresa = resp
        this.detallPagos = resp.payments
       this.detallFacturas = resp.invoices

      })




  }

  SaveLoadedInvoices(elemt:any){

    let body = [
      {
        "invoices" : elemt
      }
    ]

    console.log(body)
  }
  GeneratePayableAcconting(elemt:any){
    let body = [
      {
        "invoices" : elemt
      }
    ]

    console.log(body)
  }





}

