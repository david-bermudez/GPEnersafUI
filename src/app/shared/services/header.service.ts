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
}
