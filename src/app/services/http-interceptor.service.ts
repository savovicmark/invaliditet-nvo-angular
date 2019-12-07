import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('miboke-token');
    if (token) {
      return next.handle(
        req.clone({
          headers: req.headers.append('Authorization', 'Bearer ' + token)
        })
      );
    } else {
      return next.handle(req);
    }
  }

  constructor() { }
}
