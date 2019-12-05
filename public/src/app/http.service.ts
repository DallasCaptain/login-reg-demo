import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }



  login(user){
    return this._http.post('/loginAngular', user,{
      headers : new HttpHeaders({"Content-Type": "application/json"}),
      observe: 'response'
  })
  }

}

