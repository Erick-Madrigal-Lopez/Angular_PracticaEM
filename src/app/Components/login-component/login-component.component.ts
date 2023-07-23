import { HttpClient } from '@angular/common/http';
import {  Input, Component, Output, EventEmitter  } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { loginResp } from 'src/app/Interfaces/model.interface';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponentComponent {
  show = false
  showError = false
  obj?:loginResp
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  username?: string
  password?: string
  encript?: string
  
  constructor(private httpClient: HttpClient, private snackbar:MatSnackBar, private router: Router){}

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
 
  submit() {
    if (this.form.valid) {
      this.show = true
      this.submitEM.emit(this.form.value);

      this.username = this.form.get('username')?.value
      let pass = this.form.get('password')?.value
      this.encript = btoa(pass).toString()
      console.warn(this.encript)

      this.httpClient.post<loginResp>('http://localhost:8080/login', {
        usuario: this.username,
        password: this.encript
      }).subscribe(data => {
        this.obj = data
        console.log(data)
        if (data.codigo != '0000'){
          this.show=false
          this.showError = true;
          let snackBarRef = this.snackbar.open(data.mensaje, undefined, {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000
          });
        } else this.router.navigate(['/home']);
      })

      console.log(this.obj)
    }
  }
  @Input() error: string | null | undefined;

  @Output() submitEM = new EventEmitter();
}
