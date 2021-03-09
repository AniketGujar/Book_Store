import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../service/bookStoreService/user-service.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  constructor(private userService:UserServiceService) { }

  books: any;
  data: any;
  count: any=0;

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks = () => {
    this.userService.fetchBooks().subscribe((res => {
      this.data = res;
      this.books = this.data.result;
      this.count = this.books.length;
      console.log("Books ", this.books)
    }),
      (err) => {
        console.log("Error ", err)
      }
    )
  }

  edit=(book:any)=>{

  }
}
