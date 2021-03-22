import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../service/bookStoreService/user-service.service';
import { DataService } from '../service/DataService/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserServiceService, private router: Router, private data: DataService) { }
  page = 1;
  pageSize=4;
  books: any[]=[];
  data1: any;
  totalBooks: any = 0;
  count: any;
  cart: any;
  wish: any;
  sort:String="Sort By";
  bookName:any;
  cityN:boolean=false;

  images = ["../../assets/images/Image 11@2x.png", "../../assets/images/Image 10@2x.png", "../../assets/images/Image 12.png",
    "../../assets/images/Image 13.png", "../../assets/images/Image 14.png", "../../assets/images/Image 18.png",
    "../../assets/images/Image 23.png", "../../assets/images/Image 36.png", "../../assets/images/Image 46.png",
    "../../assets/images/Image 7.png", "../../assets/images/Image 13.png", "../../assets/images/Image 10.png"];

  ngOnInit(): void {
    this.getBooks();
    this.data.currentsearch.subscribe(bookName=>this.bookName=bookName)
  }

  getBooks = () => {
    this.userService.fetchBooks().subscribe((res => {
      this.data1 = res;
      this.books = this.data1.result;
      this.totalBooks = this.books.length;
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
      this.count = this.cart.length;
      this.addWishCartlist();
      this.changeCount();
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
    }, (err) => {
      console.log(err)
    })
  }

  bookDetails = (boook: any, image: String) => {
    boook.images=image;
    console.log(image, " ", boook)
    this.sendBook(boook);
    this.router.navigateByUrl('dashboard/book');
  }

  changeCount = () => {
    this.data.changeCount(this.count)
  }

  sendBook = (boook:any) => {
    this.data.changeBook(boook)
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
      this.sort="Price(Low-High)";
      this.books.sort((a: any, b: any) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortByIn == "phl") {
      this.sort="Price(High-Low)";
      this.books.sort((a: any, b: any) => parseFloat(b.price) - parseFloat(a.price));
    }
    else if (sortByIn == "a") {
      this.sort="A-Z";
      this.books.sort((a: any, b: any) => {
        return a.bookName.localeCompare(b.bookName);
      });
    } else {
      this.sort="Z-A";
      this.books.sort((a: any, b: any) => {
        return b.bookName.localeCompare(a.bookName);
      });
    }
  }
}
