import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from '../service/bookStoreService/user-service.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: any = FormGroup;
  submitted = false;
  flag = true;
  result: any;
  checked = false;
  fieldTextType: boolean=false;

  constructor(private formBuilder: FormBuilder, private userService: UserServiceService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^([a-z]+[0-9a-z-!$%+&_.]*){3,15}@[a-z0-9]{1,8}[.]*([a-z]{2,4})*.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]]
    })
  }

  adminCheck = () => {
    this.checked = !this.checked;
  }

  onSubmit = () => {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    this.postLogin(this.loginForm.value)
  }

  login = () => {
    this.flag = true;
  }

  toggleFieldTextType=()=>{
    this.fieldTextType = !this.fieldTextType;
  }

  signUp = () => {
    this.flag = false;
  }

  postLogin = (loginData: any) => {
    if (this.checked) {
      this.userService.adminLogin(loginData).subscribe((res) => {
        console.log("Sucess: ", res)
        this.result = res;
        this.httpResponseAdmin();
      },
        (err) => {
          console.log(err)
        })
    } else {
      this.userService.login(loginData).subscribe((res) => {
        console.log("Login: ", res)
        this.result = res;
        this.httpResponse();
      },
        (err) => {
          console.log(err)
        })
    }
  }

  httpResponse = () => {
    if (this.result.result.accessToken) {
      localStorage.setItem('token', this.result.result.accessToken)
      localStorage.setItem('email', this.loginForm.value.email)
      this.router.navigate(['/dashboard/home'])
    }
  }

  httpResponseAdmin= () => {
    if (this.result.result.accessToken) {
      localStorage.setItem('token', this.result.result.accessToken)
      localStorage.setItem('email', this.loginForm.value.email)
      this.router.navigate(['/admin/library'])
    }
  }
}
