import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm:FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(){
    this.submitted = true;
    if(this.loginForm.invalid){
      return;
    }
    this.router.navigate(["/admin/blog-list"]);

  }

}
