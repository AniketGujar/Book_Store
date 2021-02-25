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
}
