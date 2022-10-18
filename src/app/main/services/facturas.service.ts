import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { DetalleFactura } from '../interfaces/factura.interfaces';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  constructor(private http:HttpClient) { }

  private baseUrl:string = 'http://localhost:9091/api/EnerSaf';

  getInvoice(Periodo:any){
    console.log(Periodo);
    let body = {Periodo}
    let headers = new HttpHeaders()
    headers = headers.append(
      'Authorization',
      'bearer ' + localStorage.getItem('token')
    );

    return this.http.post<any>(`${this.baseUrl}/GetPendingInvoice`,body,{headers})
  }


  ValidatePendingInvoice( facturas : any ){
    let body = facturas;
    let headers = new HttpHeaders()
    headers = headers.append(
      'Authorization',
      'bearer ' + localStorage.getItem('token')
    );

    return this.http.post<any>(`${this.baseUrl}/ValidatePendingInvoice`,body,{headers})

  }

  GetPendingInvoiceItems(factura:any){

    let {fechafacturacion,version,factura_id} = factura
    // fechafacturacion = this.formatDate(fechafacturacion)
    let body = {"Fechafacturacion" :fechafacturacion,
                 "Version" :  version,
                 "Factura_id" : factura_id}
    let headers = new HttpHeaders()
    headers = headers.append(
      'Authorization',
      'bearer ' + localStorage.getItem('token')
    );

    return this.http.post<any>(`${this.baseUrl}/GetPendingInvoiceItems`,body,{headers})
  }

  GetErrorInvoice (factura:any){

    let {fechafacturacion,version,factura_id} = factura
    // fechafacturacion = this.formatDate(fechafacturacion)
    let body = {"Fechafacturacion" :fechafacturacion,
                 "Version" :  version,
                 "Factura_id" : factura_id}
    let headers = new HttpHeaders()
    headers = headers.append(
      'Authorization',
      'bearer ' + localStorage.getItem('token')
    );

    return this.http.post<any>(`${this.baseUrl}/GetErrorInvoice`,body,{headers})
  }

  GenerateInvoiceAcconting(factura:any, tipo:string){
    let {fechafacturacion,version,factura_id} = factura
    // fechafacturacion = this.formatDate(fechafacturacion)
    let body = {
                  "Fechafacturacion" :fechafacturacion,
                  "Version"    : version,
                  "Factura_id" : factura_id,
                  "Interfase"  : tipo
               }
    let headers = new HttpHeaders()
    headers = headers.append(
      'Authorization',
      'bearer ' + localStorage.getItem('token')
    );

    return this.http.post<any>(`${this.baseUrl}/GenerateInvoiceAcconting`,body,{headers})
  }

  GetLoadedInvoiceByCompany(){
    let headers = new HttpHeaders()
    headers = headers.append(
      'Authorization',
      'bearer ' + localStorage.getItem('token')
    );

    console.log(headers)
    return this.http.post<any>(`${this.baseUrl}/GetLoadedInvoiceByCompany`,null,{headers:headers})
  }

  GetLoadedInvoices(cliente:any,periodo:string):Observable<any>{

    let { group_ids } = cliente
    let period = periodo
    let body = {group_ids, period}
    let headers = new HttpHeaders()
    headers = headers.append(
      'Authorization',
      'bearer ' + localStorage.getItem('token')
    );

    console.log(headers)
    return this.http.post<any>(`${this.baseUrl}/GetLoadedInvoices`,body,{headers:headers})
  }

  GetLoadedInvoicesDummie():Observable<any>{
    return this.http.get('assets/factura.json')
  }

  SaveLoadedInvoices(factura:any){




  }


  formatDate(date:string){
    let formatted_date = date.substring(0,4)+date.substring(5,6)+date.substring(7,8)
     return formatted_date;
    }

}
