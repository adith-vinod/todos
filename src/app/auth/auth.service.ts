import { inject, Injectable } from '@angular/core';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { signupData } from '../shared/types';
import { from, tap } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private tokenService = inject(TokenService)

  constructor() {}

  signup(signupData: signupData) {
    return from(
      createUserWithEmailAndPassword(
        this.auth,
        signupData.email,
        signupData.password
      )
    );
  }

  login(signupData: signupData) {
    return from(
      signInWithEmailAndPassword(
        this.auth,
        signupData.email,
        signupData.password
      )
    ).pipe(tap((res:any) => {
      const {accessToken,refreshToken,expirationTime} = res?.user.stsTokenManager
      if(accessToken && expirationTime){
        const tokenData = {accessToken,expirationTime}
        this.tokenService.setToken(tokenData)
      }
    }));
  }

  logoutOut(){
    return from(signOut(this.auth))
  }
}
