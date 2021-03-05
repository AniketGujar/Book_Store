import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private wishlist = new BehaviorSubject({});
  newWishlist = this.wishlist.asObservable();

  constructor() { }

  changeMessage(books:any){
    this.wishlist.next(books)
  }
}
