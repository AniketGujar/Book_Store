import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserServiceService } from '../service/bookStoreService/user-service.service';
import { Subscription } from 'rxjs';
import { DataService } from '../service/DataService/data.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit, OnDestroy {

  books: any;
  subscription: any = Subscription;

  constructor(private userService: UserServiceService, private data: DataService) { }

  len: Number = 0;

  ngOnInit(): void {
    this.getWishlist();
  }

  getWishlist = () => {
    this.userService.getWishList().subscribe((res) => {
      console.log("wishlist ", res)
      this.data.changeMessage({"message":"new"})
      this.books = res;
      this.books = this.books.result;
      this.len = this.books.length;
      console.log("wishlist res ", this.books)
    }, (err) => {
      console.log(err)
    })
  }

  newWish() {
    this.data.changeMessage(this.getWishlist())
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
