import { CommonModule } from '@angular/common';
import {ChangeDetectionStrategy, Component,signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import { RouterLink} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,  RouterLink ,NzFormModule,NzInputModule,NzButtonModule,NzIconModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  passwordVisible=true;

constructor(private fb :FormBuilder
    , private router:Router,private message :NzMessageService
    ,private authService:AuthService
  ){}

  validateForm!:FormGroup;

  ngOnInit(): void {
   this.validateForm =this.fb.group({
    email :[null , [Validators.required , Validators.email]],
    password:[null , [Validators.required]]
     })
  }

  submitForm(){
   
      if (this.validateForm.valid) {
        

            this.authService.login(this.validateForm.value).subscribe(res=>{
              console.log(res)
        
            if(res.id != null){
                  this.message.success('Logged Successfully !!! ' ,{nzDuration:5000})
                  
                const user={
                  id:res.id ,
                  role:res.userRole
                }
                StorageService.saveUser(user)
                if(StorageService.isAdminLogged()){
                  this.router.navigateByUrl("/admin/dashboard")
                }else if(StorageService.isEmployeeLogged()){
                  this.router.navigateByUrl("/user/dashboard")
                }


            }
         },error=>{
            console.log(error)
            this.message.success('Bad Credentials !!! ' ,{nzDuration:5000})
      
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

/** if(res.id != null){

          const user={
            id: res.id,
            role : res.userRole
        }
        StorageService.saveUser(user);
        StorageService.saveToken(res.token);
        this.snackbar.open("logged Successfully...." , "Close" ,{duration:5000});
      }else{
        this.snackbar.open("logged Failed...." , "Close" ,{duration:5000});
        return;
      } */
