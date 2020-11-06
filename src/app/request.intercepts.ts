import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest, HttpResponse
} from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { map ,catchError} from 'rxjs/operators';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { tap } from 'rxjs/operators';



// import { nextContext } from "@angular/core/src/render3";

@Injectable()
export class NoopInterceptor implements HttpInterceptor {
  url:string = this.router.url;
  constructor(private router:Router){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // console.log("hello interceptor");

      if(sessionStorage.length>0){
        const changedReq = req.clone({headers: req.headers.set('Authorization', sessionStorage.getItem('token'))});
        console.log(changedReq)

        return next.handle(changedReq).pipe(tap(
          (err: any) => {

            if (err instanceof HttpErrorResponse) {

              console.log(err);
              console.log('req url :: ' + req.url);
              if (err.status === 401) {
                sessionStorage.clear();
                this.router.navigate(['']);
              }
            }
          }
        ));}
      else
      {
        sessionStorage.clear();

         const changedReq = req.clone({headers: req.headers.set('Content-Type', 'application/json')});
         this.router.navigate(['']);
         return next.handle(changedReq);
      }


  }
}
