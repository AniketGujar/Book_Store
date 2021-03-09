import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../service/bookStoreService/user-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserServiceService, private router: Router) { }
  page = 4;
  books: any;
  data: any;
  count: any=0;
  cart: any;
  wish: any;
  @Output() cartLength: Number = 0;

  images = ["../../assets/images/Image 11@2x.png", "../../assets/images/Image 10@2x.png", "../../assets/images/Image 12.png",
    "../../assets/images/Image 13.png", "../../assets/images/Image 14.png", "../../assets/images/Image 18.png",
    "../../assets/images/Image 23.png", "../../assets/images/Image 36.png", "../../assets/images/Image 46.png",
    "../../assets/images/Image 7.png", "../../assets/images/Image 13.png", "../../assets/images/Image 10.png"];

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks = () => {
    this.userService.fetchBooks().subscribe((res => {
      this.data = res;
      this.books = this.data.result;
      this.count = this.books.length;
      console.log("Books ", this.books)
      this.cartItems();
      this.getWishlist();
    }),
      (err) => {
        console.log("Error ", err)
      }
    )
  }

  cartItems = () => {
    this.userService.getCartItems().subscribe((res => {
      console.log("cart  ", res)
      let result: any = res;
      this.cart = result.result;
      this.cartLength = this.cart.length;
      console.log("cart length", this.cartLength)
      this.addWishCartlist();
    }),
      (err) => {
        console.log("Error ", err)
      }
    )
  }

  getWishlist = () => {
    this.userService.getWishList().subscribe((res) => {
      console.log("wishlist ", res)
      this.wish = res;
      this.wish = this.wish.result;
      console.log("wishlist res ", this.wish)
    }, (err) => {
      console.log(err)
    })
  }

  bookDetails = (data: any, image: String) => {
    console.log(image, " ", data)
    // this.router.navigateByUrl('dashboard/book');
  }

  addToCart = (id: String) => {
    console.log(id);
    this.userService.addCart(id).subscribe((res) => {
      console.log(res)
      this.getBooks();
    }, (err) => {
      console.log(err)
    })
  }

  postWishlist = (id: String) => {
    this.userService.postWishList(id).subscribe((res) => {
      console.log(res)
    }, (err) => {
      console.log(err)
    })
  }

  addWishCartlist = () => {
    for (let i = 0; i < this.cart.length; i++) {
      for (let j = 0; j < this.books.length; j++) {
        if (this.cart[i].product_id._id == this.books[j]._id) {
          this.books[j].isAdded = true;
          this.books[j].productId = this.cart[i]._id;
        }
      }
    }
    console.log("added ", this.books)
  }

  removeWishlistItem = (id: String) => {
    console.log(id)
    this.userService.deleteWishList(id).subscribe((res) => {
      console.log("wishlist delete ", res)
    }, (err) => {
      console.log(err)
    })
  }

  removeFromCart = (id: String) => {
    console.log(id, " RemoveFromCart")
    this.userService.deleteCartItem(id).subscribe((res) => {
      console.log("cart item delete ", res)
      this.getBooks();
    }, (err) => {
      console.log(err)
    })
  }

  sortBy = (sortByIn: String) => {

    if (sortByIn == "p") {
      this.books.sort((a: any, b: any) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortByIn == "a") {
      this.books.sort((a: any, b: any) => {
        return a.bookName.localeCompare(b.bookName);
      });
    } else {
      this.books.sort((a: any, b: any) => {
        return b.bookName.localeCompare(a.bookName);
      });
    }
  }
}
