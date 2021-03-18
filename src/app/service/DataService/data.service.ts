import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private cartCount = new BehaviorSubject<Number>(0);
  currentCount = this.cartCount.asObservable();

  private search = new BehaviorSubject<any>("");
  currentsearch = this.search.asObservable();

  private book = new BehaviorSubject<any>({});
  currentbook = this.book.asObservable();

  constructor() { }

  changeCount(count:any){
    this.cartCount.next(count)
  }

  changeSearch(bookName:any){
    this.search.next(bookName)
  }

  changeBook(book:any){
    this.book.next(book)
  }
}
  