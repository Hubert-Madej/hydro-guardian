import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { LoginFormPayload } from '../../models/login-form-payload.interface'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Output() signIn = new EventEmitter<LoginFormPayload>()

  form: FormGroup<{
    username: FormControl<string | null>
    password: FormControl<string | null>
  }>

  ngOnInit(): void {
    this.createForm()
  }

  createForm(): void {
    this.form = new FormGroup({
      username: new FormControl<string | null>(null, Validators.required),
      password: new FormControl<string | null>(null, Validators.required),
    })
  }

  submit(): void {
    if (this.form.valid) {
      this.signIn.emit(this.form.getRawValue() as LoginFormPayload)
    } else {
      this.form.markAllAsTouched()
    }
  }
}
