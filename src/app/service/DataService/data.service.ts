import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private wishlist = new BehaviorSubject({});
  newWishlist = this.wishlist.asObservable();

  private profile = new BehaviorSubject({});
  profileData = this.profile.asObservable();

  constructor() { }

  changeMessage(books:any){
    this.wishlist.next(books)
    console.log(this.newWishlist)
  }

  changeProfile(user:any){
    this.profile.next(user)
  }
}
