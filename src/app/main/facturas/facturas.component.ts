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
    public menus:any[] = []
    seleccionado: string[] = [];

    dataSource:any

  // displayedColumns: string[] = ['#', 'Cliente', 'Factura', 'Concepto','Valor Concepto','Fecha Vencimiento','Estado'];
  displayedColumns: string[] = ['select','Fecha Vencimiento','No','Cliente', 'Version', 'Factura', 'Concepto','Municipio','Estado','getdetails'];
  displayedColumnsItems: string[] = ['index','Descripcion', 'Valor'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: Factura | null |undefined;
  facturaItems: any;

  @Input() perido : any ;

  constructor(private dialogo:MatDialog, public _facturas:FacturasService) {
    this.obtenerFacturas()
  }

  isModify : boolean = false

  ngOnInit(): void {

    let perfil = localStorage.getItem('profile')
    if(perfil === 'MODIFY'){
      this.isModify = true;
    }

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


      if(info){

        if( info.length === 0){
          swal.fire({
            title : 'No se encontraron Facturas para el Período',
            icon : 'warning',
          })
        } else {
          this.validar = false
          this.facturacion = info
        }
      }else{

        swal.fire({
          text : info
        })
      }
    },error => {
      swal.fire({
        text : error
      })
    })
    }else{
      this._facturas.getInvoice('').subscribe( info => {
        if( info.length === 0)
        {
          swal.fire({
            title : 'No se encontraron Facturas para el período',
            icon : 'warning',
          })
        }else{
          this.validar = false
          this.facturacion = info
        }
        // console.log(info)
    },error => {

      this._facturas.logout()
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
    },error => {

      this._facturas.logout()
    })

  }

  obtenerErrorFactura(factura : any){

    this._facturas.GetErrorInvoice(factura).subscribe( resp => {
      swal.fire({
        title : resp.mensaje,
        icon : 'warning',
      })
    },error => {

      this._facturas.logout()
    })

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

  GenerateInvoiceAcconting(tipoContabilizacion : string){


      this._facturas.GenerateInvoiceAcconting(this.seleccionado , tipoContabilizacion).subscribe( resp => {
        this.validacionFinalizada = true;
        swal.fire({
          title : resp.mensaje,
          icon : 'warning',
        })
        this.seleccionado = []
      },error => {

        this._facturas.logout()
      })
  }

  ObtenerOpcionesMenu(factura:number){
    this._facturas.GenerateMenuInvoices(factura)
    .subscribe( resp =>
      {
        this.menus =resp
        console.log(this.menus)
      }
      )

  }


  onChange(ob:any,item:any) {

    if(ob.checked){

      this.seleccionado.push(item)
    }else{

      const aux = this.seleccionado.filter(value => value !== item )

      // console.log(aux)


      this.seleccionado = aux
    }

    console.log(this.seleccionado)
  }
}


