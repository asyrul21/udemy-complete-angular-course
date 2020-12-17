// Interceptors

import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor {

    // takes 2 arguments
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('Request is on its way');
        console.log(req.url);
        const modifiedReq = req.clone({
            headers: req.headers.append('Auth', 'xyz')
        })

        // return next.handle(req);
        return next.handle(modifiedReq);
        // return next.handle(modifiedReq).pipe(tap(event => {
        //     console.log(event);
        //     if (event.type === HttpEventType.Response) {
        //         console.log('Response arrived, body data: ');
        //         console.log(event.body);
        //     }
        // }));
    }
}

// add to app.module