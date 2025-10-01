import { Component, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  private authService = inject(AuthService);
  private router = inject(Router)

  onLogout(){
    this.authService.logoutOut().subscribe(
      res => {this.router.navigate(['/'])},
    )
  }

}
