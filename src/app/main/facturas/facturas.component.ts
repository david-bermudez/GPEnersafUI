import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { DetalleErrorComponent } from '../detalle-error/detalle-error.component';
import { Factura } from '../interfaces/factura.interfaces';
import { FacturasService } from '../services/facturas.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class FacturasComponent implements OnInit {

    public validar:boolean = true
    public facturacion:any[] = []
    public mensajes:any[] = []
    public verDetalle:boolean = true;
    public validacionFinalizada:boolean = false;
    public progress = {
      validated : false,
      invoiced : false,
      taxed : false,
      budgeted : false
    };

    dataSource:any

  // displayedColumns: string[] = ['#', 'Cliente', 'Factura', 'Concepto','Valor Concepto','Fecha Vencimiento','Estado'];
  displayedColumns: string[] = ['Fecha Vencimiento','No','Cliente', 'Version', 'Factura', 'Concepto','Municipio','Estado','getdetails'];
  displayedColumnsItems: string[] = ['index','Tipo Asiento','Descripcion', 'Valor'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: Factura | null |undefined;
  facturaItems: any;

  @Input() perido : any ;

  constructor(private dialogo:MatDialog, public _facturas:FacturasService) {
    this.obtenerFacturas()
  }

  ngOnInit(): void {
  }

  expandedSymbol: string = '';
  toggleExpandableSymbol(symbol: string): void {
    console.log(symbol)

    this.expandedSymbol = this.expandedSymbol === symbol
      ? ''
      : symbol;
  }

  obtenerItems(factura:any){

    let moneyFormat = Intl.NumberFormat('es-CO');

    if(factura.factura_dian !== this.expandedSymbol){

      console.log(factura.factura_dian)
      this._facturas.GetPendingInvoiceItems(factura)
      .subscribe( resp =>
            this.facturaItems = resp
        )
      this.expandedSymbol = this.expandedSymbol === factura.factura_dian
        ? ''
        : factura.factura_dian;
    }

  }

  obtenerFacturas(){
    console.log("obtenerFacturas");

    if(this.perido  !== undefined){
      let fecha = new Date(this.perido)
      let year  = fecha.getFullYear()
      let month = fecha.getMonth() + 1
      let period = year + month.toString().padStart(2,"0");

      console.log("obtenerFacturas");
      this._facturas.getInvoice(period.toString())

    .subscribe( info => {
      if( info.length === 0){
        swal.fire({
          title : 'No se encontraron Facturas para el periodo',
          icon : 'warning',
        })
      } else {
        this.validar = false
        this.facturacion = info
      }
    })
    }else{
      this._facturas.getInvoice('').subscribe( info => {
        if( info.length === 0)
        {
          swal.fire({
            title : 'No se encontraron Facturas para el periodo',
            icon : 'warning',
          })
        }else{
          this.validar = false
          this.facturacion = info
        }
        // console.log(info)
    })
    }
  }

  validarFacturas(factura: any){

    let invoices = { invoices : [ factura ] };
    this.mensajes = []

    this._facturas.ValidatePendingInvoice(invoices).subscribe( resp => {
      this.validacionFinalizada = true;
      swal.fire({
        title : resp.mensaje,
        icon : 'warning',
      })
    })

  }

  obtenerErrorFactura(factura : any){

    this._facturas.GetErrorInvoice(factura).subscribe( resp => {
      swal.fire({
        title : resp.mensaje,
        icon : 'warning',
      })
    })

  }

  obtenerMensajeIndividuales(){

    for(let i = 0 ; i < this.mensajes.length; i++)
    {
      debugger
      if(this.mensajes[i].id === this.facturacion[i].factura_id){

          return ''
      }
    }

    return 'oe'

  }

  hola(factura:any,index:number){
    debugger
    for(let i = 0 ; i < this.mensajes.length; i++)
    {
      if(this.mensajes[i].id === factura.factura_id){

          return this.mensajes[i].code
      }
    }

  }


  openDialog(factura:any) {


    let numeroFacura = ''

    for(let i = 0 ; i < this.mensajes.length; i++)
    {
      if(this.mensajes[i].id === factura.factura_id){

         numeroFacura = this.mensajes[i].mensaje
      }
    }

    // console.log(numeroFacura)

    if(numeroFacura !== ''){

      Swal.fire( {
        title: '<strong>Tu Factura Fallo</strong>',
        icon : 'error',
        html : '<bold>Detalle</bold> : ' +numeroFacura

      })
    }else{
      Swal.fire( {
        title: '<strong>Factura Correcta</strong>',
        icon : 'success',
        html : factura.id

      })

    }

    // this.dialogo.open(DetalleErrorComponent, {
    //   width:'1000px',
    //   height:'800px',
    //   data: {
    //     id: numeroFacura,
    //   },
    // });
  }

  getRecord(factura:any){
    this._facturas.GetPendingInvoiceItems(factura)
    .subscribe( console.log)
  }

  GenerateInvoiceAcconting(factura:any ,tipoContabilizacion : string){
      this._facturas.GenerateInvoiceAcconting(factura , tipoContabilizacion).subscribe( resp => {
        this.validacionFinalizada = true;
        swal.fire({
          title : resp.mensaje,
          icon : 'warning',
        })
      })
  }
}


