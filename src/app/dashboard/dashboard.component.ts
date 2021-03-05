import { Component, AfterViewInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { ViewChild } from '@angular/core'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {

  constructor() { }

  @ViewChild(HomeComponent) home:any;

  public isMenuCollapsed = true;

  length:any=0;

  ngAfterViewInit() {
    this.length=this.home.cartLength;
  }


}
