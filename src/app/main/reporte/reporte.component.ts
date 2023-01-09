import { Component, OnInit } from '@angular/core';
import { FacturasService } from '../services/facturas.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  htmlformat:string = ''

  constructor( private _facturas:FacturasService) {

    this.htmlformat = this._facturas.generarHtmlDummie()
   }

  ngOnInit(): void {
  }

}
