import { inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { CanMatchFn, Router } from '@angular/router';
import { map, take } from 'rxjs';

export const authGuard: CanMatchFn = (route, segments) => {
  const auth = inject(Auth);
  const router = inject(Router);
  
  return authState(auth).pipe(take(1), map(user => {
    if(user){
      return true
    }else{
      router.navigate(['/'])
      return false
    }
  }))
};
