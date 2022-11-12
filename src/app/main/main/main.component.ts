import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../loader/loader.service';
import { FacturasService } from '../services/facturas.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(public loader:LoaderService, private factura:FacturasService) {


  }

  periodo!:string
  invoices!:string

  ngOnInit(): void {
  }

  periodChange(event:any){
    console.log(this.periodo)
  }


}
