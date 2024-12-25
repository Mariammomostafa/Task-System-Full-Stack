import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SearchPipe } from '../../pipes/search.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule , SearchPipe ,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
