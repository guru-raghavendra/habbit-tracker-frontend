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
    let errMsg = err.message ? err.message : err.detail;
    console.log(errMsg)
    if (!errMsg) {
      this.toast.error(err);
    } else {
      this.toast.error(errMsg || 'Something went wrong please try again.');
    }
  }

  showErrorr(err: any) {
    let errMsg = '';
  
    if (err.error) {
      errMsg = err.error.message || err.error.detail;
    } 

    else if (err.username) {
      errMsg = err.username[0]; // Assuming it's always an array with at least one message
    } 
  
    // Fallback for other types of errors
    else if (err.statusText) {
      errMsg = err.statusText;
    } else if (typeof err === 'string') {
      errMsg = err;
    } else {
      errMsg = 'Something went wrong. Please try again.';
    }
  
    // Display the error message using toast
    this.toast.error(errMsg);
  }
  

  showLoader() {
    this.ngxService.start();
  }

  hideLoader() {
    this.ngxService.stop();
  }
}
