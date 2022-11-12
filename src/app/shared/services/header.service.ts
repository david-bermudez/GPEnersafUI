import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {


  baseUrl = 'http://localhost:9092/GPEnersafAPI/api/EnerSaf'

  constructor(private http:HttpClient) { }


  GetInfo(){

    let headers = new HttpHeaders()
    headers = headers.append(
      'Authorization',
      'bearer ' + localStorage.getItem('token')
    );

    return this.http.post<any>( `${this.baseUrl}/ListConfiguration`,'',{headers:headers})
  }
  update(body:any){

    let headers = new HttpHeaders()
    headers = headers.append(
      'Authorization',
      'bearer ' + localStorage.getItem('token')
    );

    return this.http.post<any>( `${this.baseUrl}/UpdateConfiguration`,body,{headers:headers})
  }
  create(factura:any){

    let{codigo,	nombre	,tipo,	tipo_asiento,	concepto	,codctaco	,codsucur,	codtipfu	,numtipfu	,codtipdc	,numdocso,	codlibro,	esquemat	,nivanal1	,codniva1,	formula	,tipo_moneda,	nivanal2	,codniva2,	codcompr,	codopepr,	nivanal3,	codniva3,	sort_order,	contrato, activo} = factura


    let body = {
      codigo,	nombre	,tipo,	tipo_asiento,	concepto	,codctaco	,codsucur,	codtipfu	,numtipfu	,codtipdc	,numdocso,	codlibro,	esquemat	,nivanal1	,codniva1,	formula	,tipo_moneda,	nivanal2	,codniva2,	codcompr,	codopepr,	nivanal3,	codniva3,	sort_order,	contrato, activo
    }
    let headers = new HttpHeaders()
    headers = headers.append(
      'Authorization',
      'bearer ' + localStorage.getItem('token')
    );

    return this.http.post<any>( `${this.baseUrl}/CreateConfiguration`,body,{headers:headers})
  }
}
