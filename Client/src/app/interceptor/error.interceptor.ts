import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { catchError, delay, Observable, throwError } from "rxjs";
@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
  constructor(private router:Router,private messageService: MessageService)
  {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 return next.handle(req).pipe(

  catchError(error=> {
    if(error){
      if(error.status===400)
      {
        if(error.error.errors)
        {
          this.messageService.add({ severity: 'error', summary:error.error.statusCode, detail: error.error.errors});
        }
        else
        {
          this.messageService.add({ severity: 'error', summary:error.error.statusCode, detail: error.error.message});
        }

      }
      if(error.status===404)
        {
          this.router.navigateByUrl('/not-found')
        }
        if(error.status===500)
          {
            const navigationExtras:NavigationExtras={state:{error:error.error}}
            this.router.navigateByUrl('/server-error',navigationExtras)
          }
    }
      return throwError(error);
  })
 )
  }

}