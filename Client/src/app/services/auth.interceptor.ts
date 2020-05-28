import { Injectable } from '@angular/core';
import {HttpInterceptor} from "@angular/common/http"


@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  intercept(req: import("@angular/common/http").HttpRequest<any>,
            next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {

              if (req.url.includes("https://cloud-api-eindproject.appspot.com", 0)) {

              if(localStorage.getItem("token") === null){
              console.log("niet in storage");

              }else{
                const idToken = localStorage.getItem("token");

                if (idToken) {
                  const cloned = req.clone({
                    headers: req.headers.set("Authorization",
                    "Bearer "+ idToken)
                  });

                  return next.handle(cloned);

                }else{
                  return next.handle(req);
                }
              }





    throw new Error("Method not implemented.");
  }



}}
