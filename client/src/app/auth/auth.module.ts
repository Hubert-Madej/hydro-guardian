import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginContainerComponent } from './containers/login-container/login-container.component';
import { LoginComponent } from './components/login/login.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [LoginContainerComponent, LoginComponent],
  exports: [LoginContainerComponent],
  imports: [CommonModule, InputTextModule, ButtonModule, ReactiveFormsModule, HttpClientModule],
})
export class AuthModule {}
