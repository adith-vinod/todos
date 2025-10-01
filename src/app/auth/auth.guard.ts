import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { CanMatchFn, Router } from '@angular/router';

export const authGuard: CanMatchFn = (route, segments) => {
  const auth = inject(Auth);
  const router = inject(Router);
  const user = auth.currentUser;

  if(user){
    return true
  }else{
    router.navigate(['/'])
    return false
  }
};
