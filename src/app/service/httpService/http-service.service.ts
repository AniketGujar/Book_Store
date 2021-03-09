import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  BaseUrl=environment.baseUrl
  constructor(private http:HttpClient) { }

  postData=(url:String,data:any)=>{
    return this.http.post(this.BaseUrl+url,data);
  }

  getData=(url:String)=>{
    return this.http.get(this.BaseUrl+url)
  }

  getDataHeader=(url:String,token:any)=>{
    let options = {
      headers: new HttpHeaders({
        'x-access-token': token,
        'Content-Type': 'application/json'
      })
    }
    return this.http.get(this.BaseUrl+url,options)
  }

  postUserAdd=(url:String,token:any,data:any)=>{
    let options = {
      headers: new HttpHeaders({
        'x-access-token': token,
        'Content-Type': 'application/json'
      })
    }
    return this.http.put(this.BaseUrl+url,data,options)
  }

  postWish=(url:String,token:any)=>{
    let options = {
      headers: new HttpHeaders({
        'x-access-token': token,
        'Content-Type': 'application/json'
      })
    }
    return this.http.post(this.BaseUrl+url,{},options)
  }

  deleteWish=(url:String,token:any)=>{
    let options = {
      headers: new HttpHeaders({
        'x-access-token': token,
        'Content-Type': 'application/json'
      })
    }
    return this.http.delete(this.BaseUrl+url,options)
  }

  postUserOrder=(url:String,token:any,data:any)=>{
    let options = {
      headers: new HttpHeaders({
        'x-access-token': token,
        'Content-Type': 'application/json'
      })
    }
    return this.http.post(this.BaseUrl+url,data,options)
  }
}
