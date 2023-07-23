import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GestionUsuariosComponentComponent } from './Components/gestion-usuarios-component/gestion-usuarios-component.component';
import { TableroUsuariosComponentComponent } from './Components/tablero-usuarios-component/tablero-usuarios-component.component';
import { PaginaPrincipalComponentComponent } from './Components/pagina-principal-component/pagina-principal-component.component';
import { LoginComponentComponent } from './Components/login-component/login-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule, MatCardTitle } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@NgModule({
  declarations: [
    AppComponent,
    GestionUsuariosComponentComponent,
    TableroUsuariosComponentComponent,
    PaginaPrincipalComponentComponent,
    LoginComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    FormsModule, 
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatSnackBarModule,
    MatIconModule, 
    MatTableModule,
    MatFormFieldModule,
    MatButtonToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
