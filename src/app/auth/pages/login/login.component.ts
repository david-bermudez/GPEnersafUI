import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import  swal from 'sweetalert2'
import { LoginService } from '../../services/login.service';
import { LoaderService } from '../../../loader/loader.service';
import { FacturasService } from '../../../main/services/facturas.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {


  miFormulario: FormGroup = this.fb.group({

    username:['@gecelca.com.co', [Validators.required]],
    password:['', [Validators.required]],

  })
  version: string = '';

  constructor( private fb: FormBuilder, private router:Router, private authService:LoginService
    , public loader : LoaderService, public factura: FacturasService) {


      this.obtenerVersion()
    }

  ngOnInit(): void {
  }



  login(){

    const {username,password} = this.miFormulario.value

    console.log(username,password)
    this.authService.login(username,password)
    .subscribe(resp =>  {
      console.log(resp.access_token)
      debugger
      if(localStorage.getItem('token')){
          this.router.navigateByUrl('/inicio')

      }
      else{
            swal.fire({
              icon : 'error',
              title :'Error',
              text : resp
            })
        }
      }
      )


  }

  obtenerVersion(){
    this.factura.getVersion().subscribe( resp  =>{
      this.version = resp
    } )
  }

}
