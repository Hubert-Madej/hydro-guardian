import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginFormPayload } from '../../models/interfaces/login-form-payload.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Output() signIn = new EventEmitter<LoginFormPayload>();
  showLoginForm = true;

  signInForm: FormGroup<{
    email: FormControl<string | null>;
    password: FormControl<string | null>;
  }>;

  signUpForm: FormGroup<{
    username: FormControl<string | null>;
    password: FormControl<string | null>;
    firstName: FormControl<string | null>;
    lastName: FormControl<string | null>;
    email: FormControl<string | null>;
    activationCode: FormControl<string | null>;
  }>;

  ngOnInit(): void {
    this.createForms();
  }

  createForms(): void {
    this.signInForm = new FormGroup({
      email: new FormControl<string | null>(null, Validators.required),
      password: new FormControl<string | null>(null, Validators.required),
    });

    this.signUpForm = new FormGroup({
      username: new FormControl<string | null>(null, Validators.required),
      password: new FormControl<string | null>(null, Validators.required),
      firstName: new FormControl<string | null>(null, Validators.required),
      lastName: new FormControl<string | null>(null, Validators.required),
      email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
      activationCode: new FormControl<string | null>(null, Validators.required),
    });
  }

  submitSignInForm(): void {
    if (this.signInForm.valid) {
      this.signIn.emit(this.signInForm.getRawValue() as LoginFormPayload);
    } else {
      this.signInForm.markAllAsTouched();
    }
  }

  toggleForm(): void {
    this.showLoginForm = !this.showLoginForm;
    this.signUpForm.reset();
    this.signInForm.reset();
  }
}
