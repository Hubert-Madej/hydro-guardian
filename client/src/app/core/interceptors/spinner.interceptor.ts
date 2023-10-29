import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { CoreFacade } from '../services/core.facade';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(private coreFacade: CoreFacade) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.coreFacade.addPendingRequest();

    return next.handle(req).pipe(finalize(() => this.coreFacade.subtractPendingRequest()));
  }
}
