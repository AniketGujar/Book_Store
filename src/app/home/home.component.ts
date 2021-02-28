import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../service/bookStoreService/user-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserServiceService) { }
  page = 4;
  books:any;
  data:any;
  images = ["../../assets/images/Image 11@2x.png", "../../assets/images/Image 10@2x.png", "../../assets/images/Image 12.png",
    "../../assets/images/Image 13.png", "../../assets/images/Image 14.png", "../../assets/images/Image 18.png",
    "../../assets/images/Image 23.png", "../../assets/images/Image 36.png", "../../assets/images/Image 46.png",
    "../../assets/images/Image 7.png", "../../assets/images/Image 13.png", "../../assets/images/Image 10.png"];

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks = () => {
    this.userService.fetchBooks().subscribe((res => {
      this.data= res;
      this.books=this.data.result;
      console.log("Books  ", this.books)
    }),
      (err) => {
        console.log("Error ", err)
      }
    )
  }

  bookDetails=(data:any,image:String)=>{
    console.log(image,"-----------------",data)
  }
}
