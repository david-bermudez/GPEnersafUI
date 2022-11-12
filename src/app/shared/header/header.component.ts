import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetalleErrorComponent } from 'src/app/main/detalle-error/detalle-error.component';
import { HeaderService } from '../services/header.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  username:string | null = ''

  constructor(public dialogo:MatDialog , public configuracionService:HeaderService) {

    this.username = localStorage.getItem('usuario')




  }

  ngOnInit(): void {

  }

  logout(){
    console.log('me sali')
    localStorage.clear()
  }

  configuracion(){
     this.dialogo.open(DetalleErrorComponent, {
      width:'1000px',
      height:'800px',
      data: {
        id: '15468621',
      },
    });
  }

}
