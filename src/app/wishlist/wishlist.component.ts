import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../service/bookStoreService/user-service.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  books: any;

  constructor(private userService: UserServiceService) { }

  len: number = 0;

  ngOnInit(): void {
    this.getWishlist();
  }

  getWishlist = () => {
    this.userService.getWishList().subscribe((res) => {
      console.log("wishlist ", res)
      this.books = res;
      this.books = this.books.result;
      this.len = this.books.length;
      this.nullValues();
      console.log("wishlist res ", this.books)
    }, (err) => {
      console.log(err)
    })
  }

  removeWishlistItem = (id: String) => {
    console.log(id)
    this.userService.deleteWishList(id).subscribe((res) => {
      console.log("wishlist delete ", res)
      this.getWishlist();
    }, (err) => {
      console.log(err)
    })
  }

  nullValues=()=>{
    let x=this.len;
    for(let i=0;i<x;i++){
      if(this.books[i].product_id==null){
        this.len--;
      }
    }
  }
}
