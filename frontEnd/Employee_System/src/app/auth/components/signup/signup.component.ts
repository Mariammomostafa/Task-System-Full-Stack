import { Component, OnInit ,signal} from '@angular/core';
import {  FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ,NzFormModule
    ,NzButtonModule,NzInputModule,NzIconModule,
     RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{
  passwordVisible=true;

  constructor(private fb :NonNullableFormBuilder
    , private router:Router,private message :NzMessageService
    ,private authService:AuthService
  ){}

  validateForm!:FormGroup;

  ngOnInit(): void {
   this.validateForm =this.fb.group({
    email :[null , [Validators.required , Validators.email]],
    password:[null , [Validators.required]],
    confirmedPassword:[null , [Validators.required]],
    name: this.fb.control('', [Validators.required])
   })
  }



  submitForm(){


    const password=this.validateForm.get('password')?.value;
    const confirmPassword=this.validateForm.get('confirmedPassword')?.value;
    if(password != confirmPassword){

      this.message.success('two passwords not match ..' , {nzDuration:5000})
    
    }else{
      
      if (this.validateForm.valid) {

     
        this.authService.signup(this.validateForm.value).subscribe((res)=>{
          console.log(this.validateForm.value)
          console.log(res)
          this.message.success('Signup Successfull ..' , {nzDuration:5000})
          this.router.navigateByUrl("/login")

        },(error :any) =>{
          this.message.error('User already Exists ..', {nzDuration:5000})
        })
       
      
        } else {
          Object.values(this.validateForm.controls).forEach(control => {
            if (control.invalid) {
              control.markAsDirty();
              control.updateValueAndValidity({ onlySelf: true });
            }
          });
        }
  }

}


  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
  }


}

