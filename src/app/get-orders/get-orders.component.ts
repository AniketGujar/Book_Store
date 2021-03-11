import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../service/bookStoreService/user-service.service';

@Component({
  selector: 'app-get-orders',
  templateUrl: './get-orders.component.html',
  styleUrls: ['./get-orders.component.scss']
})
export class GetOrdersComponent implements OnInit {

  constructor(private userService: UserServiceService) { }

  orders:any;

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders = () => {
    this.userService.orders().subscribe((res) => {
      console.log("Orders: ", res)
      this.orders=res;
      this.orders=this.orders.result;
    }, (err) => {
      console.log("Error: ", err)
    })
  }
}
