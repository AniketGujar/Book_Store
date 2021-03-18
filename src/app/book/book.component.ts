import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../service/bookStoreService/user-service.service';
import { DataService } from '../service/DataService/data.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  constructor(private userService:UserServiceService,private data:DataService) { }

  book:any;
  image:any;
  id:any;
  feedback:any;
  comment:any;
  rating5:Number=5;
  rating4:Number=4;
  rating3:Number=3;
  rating2:Number=2;
  rating1:Number=1;
  
  ngOnInit(): void {
    this.data.currentbook.subscribe(book=>this.book=book)
    console.log(this.book)
    this.image=this.book.images;
    this.id=this.book._id;
    this.getFeedback();
  }

  getFeedback=()=>{
    this.userService.getFeedback(this.id).subscribe((res)=>{
      this.feedback=res;
      this.feedback=this.feedback.result;
      console.log("Feedback ", res)
    },(err)=>{
      console.log("Error ",err)
    })
  }

  postFeedback=()=>{
    let data1={
      "comment": this.comment,
      "rating": this.rating4
    }
    console.log(data1)
    this.userService.postFeedback(this.id,data1).subscribe((res)=>{
      console.log("Feedback post", res)
    },(err)=>{
      console.log("Error ",err)
    })
  }
}
