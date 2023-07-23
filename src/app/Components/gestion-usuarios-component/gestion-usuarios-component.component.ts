import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { loginResp, registrarUsuario } from 'src/app/Interfaces/model.interface';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-gestion-usuarios-component',
  templateUrl: './gestion-usuarios-component.component.html',
  styleUrls: ['./gestion-usuarios-component.component.scss']
})
export class GestionUsuariosComponentComponent {
  registrarUser?: registrarUsuario
  hide = true
  showSpinner = false
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  formulario: FormGroup = new FormGroup({
    login: new FormControl(''),
    password: new FormControl(''),
    nombre: new FormControl(''),
    cliente: new FormControl(''),
    email: new FormControl(''),
    fechaAlta: new FormControl({ value: new Date().toLocaleDateString(), disabled: true }), //dummy
    fechaBaja: new FormControl({ value: '-', disabled: true }), //null
    estatus: new FormControl({ value: 'A', disabled: true }), //A
    intentos: new FormControl({ value: '0', disabled: true }), //0
    fechaRevocado: new FormControl({ value: '-', disabled: true }), //null
    fechaVigencia: new FormControl({ value: '-', disabled: true }), //null
    noAcceso: new FormControl(''),
    apat: new FormControl(''),
    amat: new FormControl(''),
    area: new FormControl(''),
    fechaModificacion: new FormControl({ value: new Date().toLocaleDateString(), disabled: true }),
  })

  constructor(public router: Router, public httpClient:HttpClient, public snackbar:MatSnackBar) {
  }

  submit() {
    console.log('submit')
    if (this.formulario.valid) {
      console.log('Valido')
      let login:string = this.formulario.get('login')?.value
      let password = btoa(this.formulario.get('password')?.value)
      let nombre = this.formulario.get('nombre')?.value
      let cliente = this.formulario.get('cliente')?.value
      let email = this.formulario.get('email')?.value
      let intentos = this.formulario.get('intentos')?.value
      let noAcceso = this.formulario.get('noAcceso')?.value
      let apat = this.formulario.get('apat')?.value
      let amat = this.formulario.get('amat')?.value
      let area = this.formulario.get('area')?.value

      this.showSpinner = true
      console.log(password)

      this.httpClient.post<loginResp>(
        'http://localhost:8080/registrarUsuario',
        {
          login: login,
          password: password,
          nombre: nombre,
          cliente: cliente,
          email: email,
          intentos: intentos,
          noAcceso: noAcceso,
          apellidoPaterno: apat,
          apellidoMaterno: amat,
          area: area,
        }
      ).subscribe(data => {
        console.log(data)
        this.showSpinner = false
        this.snackbar.open(data.mensaje, undefined, {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000
        });
      })

    } else {
      console.warn('No Valido')
    }
  }

  salir() {
    this.router.navigate(['home'])
  }

}

