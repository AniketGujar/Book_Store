import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../service/bookStoreService/user-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  constructor(private userService: UserServiceService, private modalService: NgbModal) { }

  books: any;
  data: any;
  author: String = "";
  bookName: String = "";
  description: String = "";
  price: Number = 0;
  discount: Number = 0;
  quantity: Number = 0;
  id: String = "";
  add: boolean = false;

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks = () => {
    this.userService.fetchBooks().subscribe((res => {
      this.data = res;
      this.books = this.data.result;
      console.log("Books ", this.books)
    }),
      (err) => {
        console.log("Error ", err)
      }
    )
  }

  delete = (id: String) => {
    this.userService.deleteItem(id).subscribe((res => {
      this.data = res;
      this.books = this.data.result;
      this.getBooks();
    }),
      (err) => {
        console.log("Error ", err)
      }
    )
  }

  openModal(targetModal: any, book: any) {
    this.add = false;
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
    this.author = book.author;
    this.bookName = book.bookName;
    this.description = book.description;
    this.quantity = book.quantity;
    this.price = book.price;
    this.discount = book.discountPrice;
    this.id = book._id;
  }

  onSubmit() {
    this.modalService.dismissAll();
  }

  addBook = (targetModal: any) => {
    this.add = true;
    this.author = "";
    this.bookName = "";
    this.description = "";
    this.quantity = 0;
    this.price = 0;
    this.discount = 0;
    this.id = "";
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
  }

  addNewBook = () => {
    console.log("Add")
    let newBook: any = {
      "bookName": this.bookName,
      "author": this.author,
      "description": this.description,
      "quantity": this.quantity,
      "price": this.price,
      "discountPrice": this.discount
    }
    this.userService.addBook(newBook).subscribe((res) => {
      console.log("Book Added ", res)
      this.getBooks();
      this.modalService.dismissAll();
    }, (err) => {
      console.log("error", err)
    })
  }

  update = () => {
    console.log("update")
    console.log(typeof (this.discount))
    let updatedBook: any = {
      "bookName": this.bookName,
      "author": this.author,
      "description": this.description,
      "quantity": this.quantity,
      "price": this.price,
      "discountPrice": this.discount
    }

    this.userService.updateBook(this.id, updatedBook).subscribe((res) => {
      console.log("Book Updated ", res)
      this.getBooks();
      this.modalService.dismissAll();
    }, (err) => {
      console.log("error", err)
    })
  }
}
