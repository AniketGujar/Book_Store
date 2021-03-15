import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/DataService/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  count:any;

  constructor(private data:DataService) { }

  public isMenuCollapsed = true;

  store = true;
  noToken = false;
  ngOnInit(): void {
    this.checkStorage();
    this.data.currentCount.subscribe(count=>this.count=count)
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
