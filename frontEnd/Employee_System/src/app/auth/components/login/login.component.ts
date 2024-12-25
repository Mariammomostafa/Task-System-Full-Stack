import { CommonModule } from '@angular/common';
import {ChangeDetectionStrategy, Component,signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { WelcomeComponent } from "../../../welcome/welcome.component";
import {MatInputModule} from '@angular/material/input';
import { RouterLink, RouterLinkActive} from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatButtonModule,MatInputModule,
    MatIconModule, MatFormFieldModule  , RouterLink],
    changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  showPassword:boolean =true;

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  
  loginForm :FormGroup =new FormGroup({
  
    email: new FormControl(null ,[Validators.required , Validators.email]),
    password: new FormControl(null , [Validators.required ]),
  });

  constructor(private authService:AuthService , private snackbar:MatSnackBar
    , private router :Router
  ){}
  
    ngOnInit(): void {}
  
    login(){
      this.authService.login(this.loginForm.value).subscribe((res)=>{
        console.log(res);

        if(res.userId != null){

          const user={
            id: res.userId,
            role : res.userRole,
            name:res.empName
          }
          StorageService.saveUser(user);
          StorageService.saveToken(res.token);
  
        console.log(user.role)
        
        if(StorageService.isAdminLogged())
            this.router.navigateByUrl("/admin/dashboard");

        else if(StorageService.isEmployeeLogged())
          this.router.navigateByUrl("/employee/empdashboard");

        this.snackbar.open("logged Successfully...." , "Close" ,{duration:5000});

        
      }else{
        this.snackbar.open("logged Failed...." , "Close" ,{duration:5000});
        return;
      }
       
    })
      
  }

  
    ShowPassword(){
      this.showPassword=! this.showPassword;
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
