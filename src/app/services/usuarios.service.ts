import { Injectable } from '@angular/core';
import { Usuario, userResp } from '../Interfaces/model.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  obj:userResp = {
    usuarios: []
  };
  usuarios: Usuario[] = [];

  constructor(public httpClient:HttpClient){}

  add(usuario: Usuario){
    this.usuarios.push(usuario);
  }

  clear(){
    this.usuarios = [];
  }

  getUsers(): userResp{
    this.httpClient.get<userResp>('http://localhost:8080/getUsuarios').subscribe(data => {
      this.obj = data
      console.log(data)
    })
    return this.obj;
  }

}
