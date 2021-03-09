import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../service/bookStoreService/user-service.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  result:any;
  registerForm: any = FormBuilder;
  submitted = false;
  checked=false;
  
  constructor(private formBuilder: FormBuilder, private userService: UserServiceService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^([a-z]+[0-9a-z-!$%+&_.]*){3,15}@[a-z0-9]{1,8}[.]*([a-z]{2,4})*.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]],
      mobileNumber: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]]
    })
  }

  adminCheck = () => {
    this.checked = !this.checked;
  }
  onSubmit = () => {
    if (this.registerForm.invalid) {
      return;
    }
    this.postRegister(this.registerForm.value)
  }

  postRegister = (registerData: any) => {
    this.userService.register(registerData).subscribe((res)=>{
      console.log("Sucess: ",res)
      this.result = res;
      this.httpResponse();
    },(err)=>{
      console.log("Failed " ,err)
    })
  }

  httpResponse=()=>{
    console.log("Response ",this.result.message);
  }
}
