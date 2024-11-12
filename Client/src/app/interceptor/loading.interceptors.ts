import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { BusyService } from "../services/busy.service";
import { Injectable } from "@angular/core";
import { delay, finalize, Observable } from "rxjs";
@Injectable()
export class LoadingInterceptor implements HttpInterceptor{
    constructor(private busyservice:BusyService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.busyservice.Busy();
    return next.handle(req).pipe(
        delay(1000),
        finalize(() => {
            this.busyservice.Idle();  // Assuming this stops the "busy" indicator
          })
    )
    }

}