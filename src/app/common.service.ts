import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private http: HttpClient ) { }

  GetAllUser() : Observable<any> {
  return this.http.get("http://localhost:3000/Users");
 }

 AddUsers(User: any) : Observable<any> {
  return this.http.post("http://localhost:3000/Users", User);
 }

 DeleteUsers(Id : any): Observable<any>{
  return this.http.delete("http://localhost:3000/Users/"+Id);
 }

 UpdateUsers(Id: any , user : any): Observable<any>{
  return this.http.patch("http://localhost:3000/Users/"+Id, user);
 }

}
