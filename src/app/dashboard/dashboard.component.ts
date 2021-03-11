import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  public isMenuCollapsed = true;

  store = true;
  noToken = false;
  ngOnInit(): void {
    this.checkStorage();
  }

  clearLocalStorage = () => {
    localStorage.clear();
    this.store = false;
    this.noToken = true;
  }

  checkStorage = () => {
    if (!localStorage.getItem('token')) {
      console.log("Login Please")
      this.store = false;
      this.noToken = true;
    }
  }
}
