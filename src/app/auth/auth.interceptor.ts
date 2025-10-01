import { HttpHandlerFn, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { TokenService } from "./token.service";
import { switchMap } from "rxjs";


export const authInterceptor:HttpInterceptorFn = (req,next:HttpHandlerFn) =>{
    const tokenService = inject(TokenService)
    console.log('called');
    
    return tokenService.token.pipe(switchMap((res:any) => {
        if(res){
            const modifiedReq = req.clone({
                headers: req.headers.set('Authorization',`Bearer ${res}`)
            })
            return next(modifiedReq)
        }
        return next(req)
    }))
}