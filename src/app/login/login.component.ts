import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  flag = true;

  ngOnInit(): void {
  }

  login=()=>{
    this.flag=true;
  }

  signUp=()=>{
    this.flag=false;
  }
}
