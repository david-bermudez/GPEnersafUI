import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { authResponse, Usuario, Login } from '../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  private baseUrl:string = 'http://localhost:9091/auth/Login';

  private _user! : Usuario ;


  get Usuario(){

    return {...this._user}
  }

  login(username:string , password:string){

    const body = {username, password}
    return this.http.post<Login>(`${this.baseUrl}`, body)
    .pipe(
      tap(resp =>{
        console.log(resp)
        if(resp.access_token){
          localStorage.setItem('token',resp.access_token!)
          localStorage.setItem('usuario',resp.username!)

        }
      }),
      map(resp => resp.access_token),
      catchError(err => of(err.error.msg))
    )

  }
}
