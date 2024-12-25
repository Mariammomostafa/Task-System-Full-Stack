import { Component, OnInit ,signal} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { WelcomeComponent } from "../../../welcome/welcome.component";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { RouterLink, RouterLinkActive} from '@angular/router';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ,MatButtonModule,MatInputModule,
    MatIconModule, MatFormFieldModule  , RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{
  showPassword:boolean =false;

  name:string ="";

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

signupForm :FormGroup =new FormGroup({

  firstName: new FormControl(null ,[Validators.required , Validators.minLength(3) , Validators.maxLength(15)]),
  lastName: new FormControl(null ,[Validators.required , Validators.minLength(3) , Validators.maxLength(15)]),
  email: new FormControl(null ,[Validators.required , Validators.email]),
  password: new FormControl(null , [Validators.required ]),
  confirmPassword: new FormControl(null , [Validators.required ]),
  
});

constructor(private authService:AuthService ,
  private snackbar:MatSnackBar, private route:Router){}

  ngOnInit(): void {}

    ShowPassword(){
    this.showPassword=! this.showPassword;
    this.name=this.signupForm.get('firstName')?.value;
  }

  submit(){

    const password=this.signupForm.get('password')?.value;
    const confirmPassword=this.signupForm.get('confirmPassword')?.value;
    if(password != confirmPassword){
      this.snackbar.open("Password must be matches ..." , "Close" ,{duration:5000});
      return;
    }
    this.authService.signup(this.signupForm.value).subscribe((res)=>{
      console.log(res);
      if(res.id != null){
        this.snackbar.open("Sign Up Successfully ..." , "Close" ,{duration:5000});
        this.route.navigate(["/login"]);
      }else{
        this.snackbar.open(" Something went wrong , Sign Up Failed ..." , "Close" ,{duration:5000});

      }
    })
  } 


}

