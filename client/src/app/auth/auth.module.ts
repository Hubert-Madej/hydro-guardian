import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginContainerComponent } from './containers/login-container/login-container.component';
import { LoginComponent } from './components/login/login.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StateKey } from '../shared/enums/state-key.enum';
import { authReducer } from './state/reducers/auth.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/effects/auth.effects';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [LoginContainerComponent, LoginComponent],
  exports: [LoginContainerComponent],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthRoutingModule,
    StoreModule.forFeature(StateKey.Auth, authReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class AuthModule {}
