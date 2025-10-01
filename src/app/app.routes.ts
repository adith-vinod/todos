import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { TodoComponent } from './todo/todo.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full',
    },
    {
        path:'login',
        component:LoginComponent,
        title:'Welcome to todo'
    },
    {
        path:'signup',
        component:SignupComponent,
        title:'Welcome to todo'
    },
    {
        path:'todos',
        canMatch:[authGuard],
        component:TodoComponent,
        title:'What would you like to do?'
    }
];
