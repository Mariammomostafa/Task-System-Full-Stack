import { Component, OnInit } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import { StorageService } from '../auth/services/storage/storage.service';
import { CommonModule } from '@angular/common';
import {NgIf} from '@angular/common';
import {  ReactiveFormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,ReactiveFormsModule,
    RouterLinkActive,CommonModule,NgIf ,NzLayoutModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  isAdminLogged!:boolean;
  isEmployeeLogged!:boolean;
  id :any =StorageService.getUserId();
   
  constructor(private router :Router) {
   
  }

  ngOnInit(): void {
    this.router.events.subscribe(event =>{
      this.isAdminLogged = StorageService.isAdminLogged();
      this.isEmployeeLogged =StorageService.isEmployeeLogged();
    })
  }

  logout(){
    StorageService.logout();

    this.router.navigateByUrl("login");
  }

 


}
