import { ErrorHandler, Inject, Injector, Injectable, NgZone } from "@angular/core";
import { HttpErrorResponse } from '@angular/common/http';
import { MdlSnackbarService } from '@angular-mdl/core';

@Injectable()
export class UIErrorHandler extends ErrorHandler {

  constructor(@Inject(Injector) private injector: Injector, private zone: NgZone){
    super();
  }

  handleError(error) {
    let mdlSnackbarService = this.injector.get(MdlSnackbarService);
    this.zone.run(() => {
      if (error.rejection && error.rejection instanceof HttpErrorResponse) {
        if (error.rejection.error.message === undefined){
          if (error.rejection.status === 0){
            mdlSnackbarService.showSnackbar({message: "Lost connection"});
          }else{
            mdlSnackbarService.showSnackbar({message: error.rejection.status+" "+error.rejection.error});
          }
        }else{
          mdlSnackbarService.showSnackbar({message: error.rejection.status+" "+error.rejection.error.message});
        }
      }else{
        mdlSnackbarService.showSnackbar({message: error.message});
      }
    });
  }
}
