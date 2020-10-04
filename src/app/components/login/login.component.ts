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
      .subscribe( response => {
        this.loginUser(response);
      }),
      err => {
        console.log('error', err)
        /* MODAL WITH ERRORS HERE */
      }
    }
  }

  loginUser(response: any): void {
    if (response.codigo === 200) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user_id', response.user_id);
    }
    if (!response.success){
      this.wrongDataMsj = response.message;
      this.showWrongData = true;
    }

    /** ANOTHERS ERRORS HERE */
  }

  get email(): AbstractControl { return this.loginForm.get('email'); }
  get password(): AbstractControl { return this.loginForm.get('password'); }

}
