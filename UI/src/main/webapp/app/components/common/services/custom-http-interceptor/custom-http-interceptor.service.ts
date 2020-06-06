import { Inject, Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
    constructor(
        @Inject("Window") private window: Window,
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.includes("assets/lang")) {
            const newReq = req.clone({
                headers: req.headers.set("Cache-Control", "no-cache, no-store, must-revalidate, post-check=0, pre-check=0")
            });
            return next.handle(newReq);
        }

        return next.handle(req)
        .pipe(
            tap((res: any) => {
                if (res instanceof HttpResponse) {
                    // some responses don't have Content-Type
                    if (res.status === 200 && res.headers.get("Content-Type") && res.headers.get("Content-Type").includes("text/html")) {
                        try {
                            const body = (res.body as string).toLowerCase();
                            if (body.includes("idaas/oidc")) {
                            this.window.location.replace("/");
                            return of();
                        }
                        } catch (e) {
                        }
                    }
                }
            }, (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err && err.error && err.error.text && err.error.text.includes("idaas/oidc")) {
                        this.window.location.replace("/");
                        return;
                    }
                } else {
                    if (err && err.error && err.error.text && err.error.text.includes("idaas/oidc")) {
                        this.window.location.replace("/");
                        return;
                    }
                }
            })
        );
    }
}
