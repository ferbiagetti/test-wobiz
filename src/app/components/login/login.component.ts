import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import { finalize } from 'rxjs/operators';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }
  
  isSubmitted = false;
  showWrongData = false;
  wrongDataMsj;
  showSpinner = false;

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5)])
  });


  ngOnInit(): void {
  }

  onSubmit(): void {
    this.wrongDataMsj = '';
    this.showWrongData = false;
    this.isSubmitted = true;
    if (this.loginForm.valid) {

      this.authService.login(this.loginForm.value)
      .pipe(finalize(() =>
        this.showSpinner = false
      ))
      .subscribe( response => {
        if (response.codigo === 200) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user_id', response.user_id);
          window.location.href = 'https://www.wobiz.com/';
        }
      },
      err => {
        if (err.error.code === 106) {
          this.wrongDataMsj = 'La contraseña no coinciden con el usuario';
          this.showWrongData = true;
        }

        if (err.error.code === 108) {
          this.wrongDataMsj = 'Usuario Incorrecto';
          this.showWrongData = true;
        }
      });
    }
  }

  get email(): AbstractControl { return this.loginForm.get('email'); }
  get password(): AbstractControl { return this.loginForm.get('password'); }

}
