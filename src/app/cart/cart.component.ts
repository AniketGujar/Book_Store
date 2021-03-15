import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../service/bookStoreService/user-service.service';
import { DataService } from '../service/DataService/data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private userService: UserServiceService, private router:Router,private data:DataService) { }

  cart: any;
  len: any;
  editCondition: boolean = true;
  show: any = "ngb-panel-1";
  show1: any = "ngb-panel-0";
  fullName: String = "";
  mobileNumber: String = "";
  address: String = "";
  city: String = "";
  state: String = "";
  type: String = "home";
  price:Number=0;
  id:String="";
  quantity:Number=1;
  productName:String="";
  amount:any=0;
  discount:any=0;
  finalAmount:any=0;
  numb = 1;

  ngOnInit(): void {
    this.cartItems();
  }

  plus(book:any) {
    this.numb=book.quantityToBuy;
    if (this.numb >= 10) {
      book.quantityToBuy=10;
    } else {
      this.numb++;
      book.quantityToBuy=this.numb;
    }
  }

  minus(book:any) {
    this.numb=book.quantityToBuy;
    if (this.numb <= 1) {
      book.quantityToBuy=1;
    } else {
      this.numb--;
      book.quantityToBuy=this.numb;
    }
  }

  cartItems = () => {
    this.userService.getCartItems().subscribe((res => {
      console.log("cart  ", res)
      let result: any = res;
      this.cart = result.result;
      this.len = this.cart.length;
      this.fullName = this.cart[0].user_id.fullName;
      this.mobileNumber = this.cart[0].user_id.phone;
      this.type = this.cart[0].user_id.address[0].addressType;
      this.address = this.cart[0].user_id.address[0].fullAddress;
      this.city = this.cart[0].user_id.address[0].city;
      this.state = this.cart[0].user_id.address[0].state;
      this.changeCount();
      this.cartValue();
      console.log("data ", this.cart[0])
    }),
      (err) => {
        console.log("Error ", err)
      }
    )
  }

  edit = () => {
    this.editCondition = !this.editCondition;
  }

  removeFromCart = (id: String) => {
    this.userService.deleteCartItem(id).subscribe((res) => {
      console.log("cart item delete ", res)
      this.cartItems();
    }, (err) => {
      console.log(err)
    })
  }

  changeCount = () => {
    this.data.changeCount(this.len)
  }

  toggleShow = () => {
    this.show = "ngb-panel-0"
  }

  toggleContinue = () => {
    this.show1 = "ngb-panel-1"
    this.show = "ngb-panel-1"
  }

  placeOrder = () => {
    let data:any={"orders":[]};
    for(let i=0;i<this.cart.length;i++){
      let b:any={
          "product_id": this.cart[i]._id,
          "product_name": this.cart[i].product_id.bookName,
          "product_quantity": this.cart[i].quantityToBuy,
          "product_price": this.cart[i].product_id.price
      }
      data['orders'].push(b);
    }
    console.log(data);
    
    this.userService.postOrder(data).subscribe((res => {
      console.log("Order Placed ", res)
      this.router.navigate(['/dashboard/order'])
    }),
      (err) => {
        console.log("Error Order ", err)
      }
    )
  }

  cartValue=()=>{
    for(let i=0;i<this.cart.length;i++){
      this.amount+=this.cart[i].product_id.price
      this.discount+=this.cart[i].product_id.discountPrice
      this.finalAmount=this.amount-this.discount
    }
  }
}
