import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario, loginResp, userResp } from '../../Interfaces/model.interface';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tablero-usuarios-component',
  templateUrl: './tablero-usuarios-component.component.html',
  styleUrls: ['./tablero-usuarios-component.component.scss']
})
export class TableroUsuariosComponentComponent implements OnInit {
  displayedColumns: string[] = ['Nombre', 'Login', 'FechaAlta', 'estatus', 'accion'];
  UsuarioDataDom: Usuario[] = [];
  UsuarioData: Usuario[] = [];
  datos: Usuario[] = [];
  temporal: Usuario[] = [];
  obj?: userResp;
  dataSource = new MatTableDataSource(this.UsuarioDataDom);
  show = false
  showde = false
  showSpinner = false
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  formEdit: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    apat: new FormControl(''),
    amat: new FormControl(''),
    login: new FormControl({ value: '', disabled: true }),
    fechaAlta: new FormControl({ value: '', disabled: true }),
    estatus: new FormControl(''),
  });
  formDel = new FormGroup({
    id: new FormControl({ value: '', disabled: false })
  })

  constructor(public httpClient: HttpClient, public snackbar: MatSnackBar,
    public router: Router) { }

  @ViewChild('focus', { static: false }) input: ElementRef | undefined;

  ngOnInit(): void {
    this.dataSource.filterPredicate = (data, filter) => {
      //filterValue.trim().toLowerCase();
      return data.FechaAlta.toLowerCase().includes(filter) ||
        data.Nombre.toLowerCase().includes(filter) ||
        data.Login.toLowerCase().includes(filter);
    }
    this.getUsuarios();
  }

  getUsuarios(): void {
    this.httpClient.get<userResp>('http://localhost:8080/getUsuarios').subscribe(data => {
      this.UsuarioDataDom = []
      data.usuarios.forEach(user => {
        console.log('USuarios en foreach')
        console.log(user)
        this.UsuarioDataDom.push({
          Nombre: `${user.nombre} ${user.apellidoPaterno} ${user.apellidoMaterno}`,
          Login: user.login + '',
          FechaAlta: user.fechaAlta.substring(0, 10).replaceAll('-', '/').split('/').reverse().join('/'),
          estatus: user.status,
          accion: ""
        })
        this.UsuarioData.push({
          Nombre: `${user.nombre}|${user.apellidoPaterno}|${user.apellidoMaterno}`,
          Login: user.login + '',
          FechaAlta: user.fechaAlta,
          estatus: user.status,
          accion: ""
        })
        this.temporal = this.UsuarioDataDom
        this.dataSource = new MatTableDataSource(this.UsuarioDataDom);
      })
      console.log(data)
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilterN(event: Event, item: string) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(item)
    this.temporal = this.UsuarioDataDom
    switch (item) {
      case 'nombre':
        this.temporal = this.temporal.filter(obj => {
          return obj.Nombre?.includes(filterValue)
        })
        break;
      case 'login':
        this.temporal = this.temporal.filter(obj => {
          return obj.Login?.includes(filterValue)
        })
        break;
      case 'fechaAlta':
        this.temporal = this.temporal.filter(obj => {
          return obj.FechaAlta?.includes(filterValue)
        })
        break;
    }
    this.dataSource = new MatTableDataSource(this.temporal);
  }

  openDialog(element: any) {
    this.show = true
    console.log(element)
    this.datos = this.UsuarioData.filter(elem => { return elem.Login == element })
    console.log(this.datos)
    this.formEdit.setValue({
      nombre: this.datos[0].Nombre?.split('|')[0],
      apat: this.datos[0].Nombre?.split('|')[1],
      amat: this.datos[0].Nombre?.split('|')[2],
      login: this.datos[0].Login,
      fechaAlta: this.datos[0].FechaAlta?.substring(0, 10).replaceAll('-', '/').split('/').reverse().join('/'),
      estatus: this.datos[0].estatus,
    })
  }

  dialogEliminar(element: any) {
    console.log(element)
    this.showde = true
    this.formDel.setValue({
      id: element
    })
  }

  cancelar() {
    this.show = false
    this.showSpinner = false
    this.showde = false
  }

  editar() {
    console.log('Editar')
    if (this.formEdit.valid) {

      this.showSpinner = true
      let nombre = this.formEdit.get('nombre')?.value
      let apellidoPaterno = this.formEdit.get('apat')?.value
      let Login = this.formEdit.get('login')?.value
      let apellidoMaterno = this.formEdit.get('amat')?.value
      let fechaAlta = this.datos[0].FechaAlta
      let estatus = this.formEdit.get('estatus')?.value

      console.log(`${nombre}|${apellidoPaterno}|${apellidoMaterno}`)
      console.log(Login)
      console.log(fechaAlta)
      console.log(estatus)

      this.httpClient.post<loginResp>('http://localhost:8080/editar', {
        nombre: `${nombre}|${apellidoPaterno}|${apellidoMaterno}`,
        login: Login,
        fechaAlta: fechaAlta,
        estatus: estatus
      }).subscribe(data => {
        console.log(data)
        if (data.codigo != null) {
          this.showSpinner = false
          this.snackbar.open(data.mensaje, undefined, {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000
          });
          this.show = false
          this.getUsuarios()
        }
      })
    }
  }

  eliminar() {
    console.log('Eliminando')
    if (this.formDel.valid) {

      let id = this.formDel.get('id')?.value;

      this.httpClient.post<loginResp>('http://localhost:8080/eliminar', {
        nombre: ``,
        login: id,
        fechaAlta: '',
        estatus: ''
      }).subscribe(data => {
        console.log(data)
        if (data.codigo != null) {
          this.showSpinner = false
          this.snackbar.open(data.mensaje, undefined, {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000
          });
          this.showde = false
          this.getUsuarios()
        }
      })
    }
  }

  filtrar(filtro: string) {
    console.log(filtro)
    let segundo = ''
    switch (filtro) {
      case 'A':
        segundo = 'Activo';
        break
      case 'Activo':
        segundo = 'A';
        break;
      case 'B':
        segundo = 'Inactivo';
        break;
      case 'Inactivo':
        segundo = 'B';
        break;
      case 'R':
        segundo = 'Revocado';
        break;
      case 'Revocado':
        segundo = 'R';
        break;
    }
    let nuevo = this.UsuarioDataDom.filter(obj => {
      return obj.estatus === filtro || obj.estatus === segundo
    })
    this.dataSource = new MatTableDataSource(nuevo);
  }

  salir() {
    this.router.navigate(['home'])
  }

  rowD(obj: any) {
    console.log(obj)
    switch (obj.estatus) {
      case 'A':
        obj.estatus = 'Activo';
        break;
      case 'B':
        obj.estatus = 'Inactivo';
        break;
      case 'R':
        obj.estatus = 'Revocado';
        break;
    }

  }

}
