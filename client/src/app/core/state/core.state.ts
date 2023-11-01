import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoreState {
  pendingRequestsCount$ = new BehaviorSubject<number>(0);

  selectPendingRequestsCount$(): Observable<number> {
    return this.pendingRequestsCount$.asObservable();
  }

  addPendingRequest(): void {
    this.pendingRequestsCount$.next(this.pendingRequestsCount$.getValue() + 1);
  }

  subtractPendingRequest(): void {
    this.pendingRequestsCount$.next(this.pendingRequestsCount$.getValue() - 1);
  }
}
