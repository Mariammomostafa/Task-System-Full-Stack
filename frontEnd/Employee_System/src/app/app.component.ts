import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {CreateEmployeeComponent} from './create-employee/create-employee.component';

import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FooterComponent,ReactiveFormsModule 
    , FormsModule ,MatButtonModule, 
    MatIconModule ,MatFormFieldModule,CommonModule ,HeaderComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'springProjectAngularBackendF';
}
