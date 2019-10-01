import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loginResp = {
    error: false,
    message: ''
  };
  formErrors = {
    required: 'This field is required',
    invalid_email: 'Email is invalid'
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  /**
   * Initiali login form
   */
  initForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  /**
   * Login api integration
   */
  login() {
    this.submitted = true;
    this.loginResp.error = false;
    if (this.loginForm.invalid) {
      return;
    }
    const sub = this.userService
      .getUsers()
      .pipe(
        tap(users => {
          this.submitted = false;
          const user = users.find(
            user =>
              user.email.toLowerCase() ===
              this.loginForm.value.username.toLowerCase()
          );
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.router.navigate(['/admin/blog-list']);
          } else {
            this.loginResp.error = true;
            this.loginResp.message = 'Invalid login details';
          }
        })
      )
      .subscribe();
  }
}
