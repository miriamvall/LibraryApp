import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { BookService } from "../services/book.service";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private bookService: BookService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authService.getToken();
        req = req.clone({
            setHeaders: {
                Authorization: "Bearer " + authToken
            }
        });
        return next.handle(req);
    }
}