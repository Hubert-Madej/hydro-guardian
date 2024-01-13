import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Injectable()
export class AppInitService {
  constructor(private readonly authService: AuthService) {}

  Init() {
    this.authService.autoLogin();
  }
}
