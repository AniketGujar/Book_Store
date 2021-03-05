import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../service/bookStoreService/user-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private userService:UserServiceService) { }

  cart:any;
  len:any;
  editCondition:boolean=true;

  ngOnInit(): void {
    this.cartItems();
  }

  cartItems = () => {
    this.userService.getCartItems().subscribe((res => {
      console.log("cart  ", res)
      let result:any=res;
      this.cart=result.result;
      this.len=this.cart.length;
      console.log("data ",this.cart)
    }),
      (err) => {
        console.log("Error ", err)
      }
    )
  }  

  edit=()=>{
    this.editCondition=!this.editCondition;
  }

  postUserAddress=()=>{
    let data={
      "addressType": "Home",
      "fullAddress": "Plot no.13, Bhallar township, Rajwada",
      "city": "Satara",
      "state": "Maharastra"
    }
    this.userService.postAddress(data).subscribe((res => {
      console.log("Address  ", res)
    }),
      (err) => {
        console.log("Error ", err)
      }
    )
  }
  
} 
