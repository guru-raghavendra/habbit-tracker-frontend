import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(
    private toast: ToastrService,
    private ngxService: NgxUiLoaderService
  ) {}

  showSuccess(msg: string) {
    this.toast.success(msg);
  }

  showError(err: any) {
    console.log(err)
    let errMsg = err.error ? err.error : err.detail;
    console.log(errMsg)
    if (!errMsg) {
      this.toast.error(err);
    } else {
      this.toast.error(errMsg || 'Something went wrong please try again.');
    }
  }
  

  showLoader() {
    this.ngxService.start();
  }

  hideLoader() {
    this.ngxService.stop();
  }
}
