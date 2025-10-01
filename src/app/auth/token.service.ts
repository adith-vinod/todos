import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenData } from '../shared/types';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  public isLoggedIn = new BehaviorSubject<boolean>(false);
  public token = new BehaviorSubject<string | null>('');

  constructor() {}

  setToken(tokenData: TokenData) {
    localStorage.setItem('accessToken', tokenData.accessToken);
    localStorage.setItem('expirationTime', tokenData.expirationTime);
    this.isLoggedIn.next(true);
    this.token.next(tokenData.accessToken);
  }

  getToken() {
    const token = localStorage.getItem('accessToken');
    this.token.next(token)
  }
}
