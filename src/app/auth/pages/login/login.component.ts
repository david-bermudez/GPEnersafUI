import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import  swal from 'sweetalert2'
import { LoginService } from '../../services/login.service';
import { LoaderService } from '../../../loader/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {


  miFormulario: FormGroup = this.fb.group({

    username:['dbermudez', [Validators.required]],
    password:['12345', [Validators.required]],

  })

  constructor( private fb: FormBuilder, private router:Router, private authService:LoginService
    , public loader : LoaderService) { }

  ngOnInit(): void {
  }



  login(){

    const {username,password} = this.miFormulario.value

    console.log(username,password)
    this.authService.login(username,password)
    .subscribe(resp =>  {
      console.log(resp)
      if(resp){
        this.router.navigateByUrl('/inicio')

        }else{
            swal.fire({
              icon : 'error',
              title :'Error',
              text : resp
            })
        }
      })

  }

}
