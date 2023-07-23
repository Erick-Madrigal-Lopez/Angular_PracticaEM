import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponentComponent } from './Components/login-component/login-component.component';
import { PaginaPrincipalComponentComponent } from './Components/pagina-principal-component/pagina-principal-component.component';
import { TableroUsuariosComponentComponent } from './Components/tablero-usuarios-component/tablero-usuarios-component.component';
import { GestionUsuariosComponentComponent } from './Components/gestion-usuarios-component/gestion-usuarios-component.component';

const routes: Routes = [
  {path:"login", component:LoginComponentComponent},
  {path:"home", component:PaginaPrincipalComponentComponent},
  {path:"tablero", component:TableroUsuariosComponentComponent},
  {path:"gestion", component:GestionUsuariosComponentComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
