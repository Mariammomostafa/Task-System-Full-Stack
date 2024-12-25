import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../storage/storage.service';


const BASE_URL="http://localhost:8080/api/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  constructor(private httpClient: HttpClient) { }

  signup(signupRequest:any):Observable<any>{
    console.log(signupRequest)
    return this.httpClient.post(`${BASE_URL}/signup` , signupRequest );
  }

  login(loginRequest:any):Observable<any>{
    console.log(loginRequest)
    return this.httpClient.post(`${BASE_URL}/login` ,loginRequest);

  }

  getEmpFromToken():Observable<any>{
    return this.httpClient.get(`${BASE_URL}/getUserfromToken`,{
      headers: this.createHeaders()
    })
  }

  private createHeaders():HttpHeaders{
    return new HttpHeaders().set(
      "Authorization" , "Bearer "+StorageService.getToken());
    }



}
