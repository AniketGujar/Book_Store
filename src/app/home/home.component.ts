import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }
  page = 4;
  images = ["../../assets/images/Image 11.png", "../../assets/images/Image 10.png", "../../assets/images/Image 12.png",
   "../../assets/images/Image 13.png", "../../assets/images/Image 14.png", "../../assets/images/Image 18.png",
    "../../assets/images/Image 23.png", "../../assets/images/Image 36.png", "../../assets/images/Image 46.png", 
    "../../assets/images/Image 7.png","../../assets/images/Image 13.png","../../assets/images/Image 10.png"];
  
    ngOnInit(): void {
  }

}
