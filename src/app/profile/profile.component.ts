import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/DataService/data.service';
import { Subscription } from 'rxjs';
import { UserServiceService } from '../service/bookStoreService/user-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private data: DataService, private userService:UserServiceService) { }

  subscription: any = Subscription;
  editCondition: boolean = true;
  cart:any;
  fullName: String = "";
  mobileNumber: String = "";
  address: String = "";
  city: String = "";
  state: String = "";
  type: String = "Home";
  email: any;
  editContact: boolean = true;

  ngOnInit(): void {
    // this.subscription = this.data.changeProfile
    this.cartItems();
  }

  putAddress = () => {
    let data = {
      "addressType": this.type,
      "fullAddress": this.address,
      "city": this.city,
      "state": this.state
    }
    console.log(data)
    this.userService.postAddress(data).subscribe((res => {
      console.log("Address  ", res)
    }),
      (err) => {
        console.log("Error ", err)
      }
    )
  }

  edit = () => {
    this.editContact = !this.editContact;
  }

  editAddress = () => {
    this.editCondition = !this.editCondition
  }

  cartItems = () => {
    this.userService.getCartItems().subscribe((res => {
      console.log("cart  ", res)
      let result: any = res;
      this.cart = result.result;
      this.fullName = this.cart[0].user_id.fullName;
      this.mobileNumber = this.cart[0].user_id.phone;
      this.type = this.cart[0].user_id.address[0].addressType;
      this.address = this.cart[0].user_id.address[0].fullAddress;
      this.city = this.cart[0].user_id.address[0].city;
      this.state = this.cart[0].user_id.address[0].state;
      this.email= localStorage.getItem('email');
    }),
      (err) => {
        console.log("Error ", err)
      }
    )
  }
}
