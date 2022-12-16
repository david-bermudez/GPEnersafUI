import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { DetalleFactura, Factura } from '../interfaces/factura.interfaces';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  constructor(private http: HttpClient, private router: Router) { }

  RecargarDetalle$ = new EventEmitter<boolean>();

  private baseUrl: string = environment.apiUrl;
  public facturas: any[] = []
  getInvoice(Periodo: any) {
    console.log(Periodo);
    let body = { Periodo }
    let headers = new HttpHeaders()
    headers = headers.append(
      'Authorization',
      'bearer ' + localStorage.getItem('token')
    );

    return this.http.post<any>(`${this.baseUrl}/GetPendingInvoice`, body, { headers })

  }


  ValidatePendingInvoice(facturas: any) {
    let body = facturas;
    let headers = new HttpHeaders()
    headers = headers.append(
      'Authorization',
      'bearer ' + localStorage.getItem('token')
    );

    return this.http.post<any>(`${this.baseUrl}/ValidatePendingInvoice`, body, { headers })

  }

  GetPendingInvoiceItems(factura: any) {
    let { fechafacturacion, version, factura_id } = factura
    // fechafacturacion = this.formatDate(fechafacturacion)
    let body = {
      "fechafacturacion": fechafacturacion,
      "Version": version,
      "Factura_id": factura_id
    }
    let headers = new HttpHeaders()
    headers = headers.append(
      'Authorization',
      'bearer ' + localStorage.getItem('token')
    );

    return this.http.post<any>(`${this.baseUrl}/GetPendingInvoiceItems`, body, { headers })
  }

  GetErrorInvoicePay(factura: any) {
    console.log("GetErrorInvoicePay->" + JSON.stringify(factura));
    let { fechaFacturacion, version, factura_id } = factura
    let body = {
      "fechafacturacion": fechaFacturacion,
      "version": version,
      "factura_id": factura_id
    }

    return this.GetErrorInvoice(body);
  }

  GetErrorInvoice(factura: any) {
    console.log("GetErrorInvoice->" + JSON.stringify(factura));
    let { fechafacturacion, version, factura_id } = factura
    // fechafacturacion = this.formatDate(fechafacturacion)
    let body = {
      "FechaFacturacion": fechafacturacion,
      "Version": version,
      "Factura_id": factura_id
    }
    let headers = new HttpHeaders()
    headers = headers.append(
      'Authorization',
      'bearer ' + localStorage.getItem('token')
    );

    return this.http.post<any>(`${this.baseUrl}/GetErrorInvoice`, body, { headers })
  }

  GenerateInvoiceAcconting(factura: any, groupName: string) {
    if(this.facturas.length > 0){

      this.facturas = []
    }

    factura.forEach((elemt: any) => {
      this.facturas.push(
        {
          "Fechafacturacion": elemt.fechafacturacion,
          "Version": elemt.version,
          "Factura_id": elemt.factura_id,
        }

      )
    })
    let { fechafacturacion, version, factura_id } = factura
    // fechafacturacion = this.formatDate(fechafacturacion)
    let body = {
      "invoices": this.facturas,
      groupName
    }
    console.log(body)
    let headers = new HttpHeaders()
    headers = headers.append(
      'Authorization',
      'bearer ' + localStorage.getItem('token')
    );

    return this.http.post<any>(`${this.baseUrl}/GenerateInvoiceAcconting`, body, { headers })
  }

  GetLoadedInvoiceByCompany() {
    let headers = new HttpHeaders()
    headers = headers.append(
      'Authorization',
      'bearer ' + localStorage.getItem('token')
    );

    console.log(headers)
    return this.http.post<any>(`${this.baseUrl}/GetLoadedInvoiceByCompany`, null, { headers: headers })
  }

  GetLoadedInvoices(cliente: any, periodo: string): Observable<any> {
    let { group_ids } = cliente
    let period = periodo
    let body = { group_ids, period }
    let headers = new HttpHeaders()
    headers = headers.append(
      'Authorization',
      'bearer ' + localStorage.getItem('token')
    );

    console.log(headers)
    return this.http.post<any>(`${this.baseUrl}/GetLoadedInvoices`, body, { headers: headers })
  }

  GetLoadedInvoicesDummie(): Observable<any> {
    return this.http.get('assets/factura.json')
  }

  SaveLoadedInvoices(body: any) {
    let headers = new HttpHeaders()
    headers = headers.append(
      'Authorization',
      'bearer ' + localStorage.getItem('token')
    );


    return this.http.post<any>(`${this.baseUrl}/SaveLoadedInvoices`, body, { headers: headers })
      .pipe(
        map(resp => console.log),
        catchError(err => of(err.error.status))
      )


  }
  GeneratePayableAcconting(body: any) {
    let headers = new HttpHeaders()
    headers = headers.append(
      'Authorization',
      'bearer ' + localStorage.getItem('token')
    );


    return this.http.post<any>(`${this.baseUrl}/GeneratePayableAcconting`, body, { headers: headers })


  }

  GenerateMenuInvoicesPay(factura: any) {
    let { fechaFacturacion, version, factura_id } = factura
    let body = {
      fechafacturacion: fechaFacturacion,
      version: version,
      factura_id: factura_id
    }
    return this.GenerateMenuInvoices(body);
  }

  GenerateMenuInvoices(factura: any) {
    console.log("GenerateMenuInvoices->" + JSON.stringify(factura));
    let { fechafacturacion, version, factura_id } = factura
    let body = {
      FechaFacturacion: fechafacturacion,
      Version: version,
      Factura_id: factura_id
    }

    console.log(body)
    let headers = new HttpHeaders()

    headers = headers.append(
      'Authorization',
      'bearer ' + localStorage.getItem('token')
    );
    return this.http.post<any>(`${this.baseUrl}/GenerateMenuInvoices`, body, { headers: headers })

  }

  getVersion() {
    return this.http.post<any>(`${this.baseUrl}/Getversion`, '',)
  }

  logout() {
    this.router.navigateByUrl('./login')
    localStorage.clear()
  }

  formatDate(date: string) {
    let formatted_date = date.substring(0, 4) + date.substring(5, 6) + date.substring(7, 8)
    return formatted_date;
  }

}
