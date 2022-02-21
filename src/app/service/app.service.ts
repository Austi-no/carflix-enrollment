import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  baseUrl: string = environment.baseUrl + 'dealer/';
  constructor(private http: HttpClient) { }


  signUp(value: any): any {
    return this.http.post(this.baseUrl + "add", value)
  }

}
