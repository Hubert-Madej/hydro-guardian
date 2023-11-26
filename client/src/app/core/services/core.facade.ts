import { Injectable } from '@angular/core';
import { CoreState } from '../state/core.state';
import { auditTime, filter, Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class CoreFacade {
  constructor(
    private readonly coreState: CoreState,
    private readonly ngxSpinnerService: NgxSpinnerService,
  ) {}

  selectPendingRequestsCount$(): Observable<number> {
    return this.coreState.selectPendingRequestsCount$();
  }

  startLoadingSpinner(): void {
    this.selectPendingRequestsCount$()
      .pipe(
        auditTime(1000),
        filter((pendingRequestsCount) => pendingRequestsCount === 1),
      )
      .subscribe((_) => this.ngxSpinnerService.show());

    this.selectPendingRequestsCount$()
      .pipe(
        auditTime(500),
        filter((pendingRequestsCount) => pendingRequestsCount === 0),
      )
      .subscribe((_) => this.ngxSpinnerService.hide());
  }

  addPendingRequest(): void {
    this.coreState.addPendingRequest();
  }

  subtractPendingRequest(): void {
    this.coreState.subtractPendingRequest();
  }
}
