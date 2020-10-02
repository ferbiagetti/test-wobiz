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
    this.isSubmitted = true;
    if (this.loginForm.valid) {

      this.authService.login(this.loginForm.value)
      .pipe(finalize(() =>
        this.showSpinner = false
      ))
      .subscribe( token => {
        this.loginUser(token);
      }),
      err => {
        console.log('error', err)
      }
    }
  }

  loginUser(token: any): void {
    if (token.status === 200){
      localStorage.setItem('token', token.token);
      localStorage.setItem('user_id', token.user_id);
    } else {
      this.wrongDataMsj = token.message;
      this.showWrongData = true;
    }
  }

  get email(): AbstractControl { return this.loginForm.get('email'); }
  get password(): AbstractControl { return this.loginForm.get('password'); }

}
