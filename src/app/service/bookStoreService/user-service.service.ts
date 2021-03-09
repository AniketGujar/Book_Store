import { Injectable } from '@angular/core';
import { HttpServiceService } from '../httpService/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private httpService:HttpServiceService) { }

  login=(data:any)=>{
    return this.httpService.postData('login',data);
  }

  register=(data:any)=>{
    return this.httpService.postData('registration',data);
  }

  fetchBooks=()=>{
    return this.httpService.getData('get/book');
  }

  getCartItems=()=>{
    return this.httpService.getDataHeader('get_cart_items', localStorage.getItem('token'));
  }

  postAddress=(data:any)=>{
    return this.httpService.postUserAdd('bookstore_user/edit_user',localStorage.getItem('token'),data);
  }

  getWishList=()=>{
    return this.httpService.getDataHeader('get_wishlist_items', localStorage.getItem('token'));
  }

  postWishList=(id:any)=>{
    return this.httpService.postWish('add_wish_list/'+id, localStorage.getItem('token'));
  }

  deleteWishList=(id:String)=>{
    return this.httpService.deleteWish('remove_wishlist_item/'+id, localStorage.getItem('token'));
  }

  addCart=(id:String)=>{
    return this.httpService.postWish('add_cart_item/'+id, localStorage.getItem('token'));
  }

  deleteCartItem=(id:String)=>{
    return this.httpService.deleteWish('remove_cart_item/'+id, localStorage.getItem('token'));
  }

  postOrder=(data:any)=>{
    return this.httpService.postUserOrder('add/order', localStorage.getItem('token'),data);
  }

  adminLogin=(data:any)=>{
    return this.httpService.postData('admin/login',data);
  }

  adminRegister=(data:any)=>{
    return this.httpService.postData('admin/registration',data);
  }
}
