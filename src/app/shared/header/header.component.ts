import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  username:string | null = ''

  constructor() {

    this.username = localStorage.getItem('usuario')

   }

  ngOnInit(): void {
  }

  logout(){
    console.log('me sali')
    localStorage.clear()
  }

}
