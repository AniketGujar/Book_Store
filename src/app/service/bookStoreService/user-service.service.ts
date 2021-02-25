import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { HttpServiceService } from '../httpService/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private httpService:HttpServiceService) { }

  login=(data:any)=>{
    return this.httpService.postData('admin/login',data);
  }

  register=(data:any)=>{
    return this.httpService.postData('admin/registration',data)
  }
}
