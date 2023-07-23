import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-principal-component',
  templateUrl: './pagina-principal-component.component.html',
  styleUrls: ['./pagina-principal-component.component.scss']
})
export class PaginaPrincipalComponentComponent {
  
  constructor(private route:Router){}

  Tablero(){
    this.route.navigate(['/tablero'])
  }

  Gestion(){
    this.route.navigate(['/gestion'])
  }

  Salir(){
    this.route.navigate(['/login'])
  }

}
