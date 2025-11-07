import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  MinLengthValidator,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  public signupForm!: FormGroup;
  private authService = inject(AuthService);
  private router = inject(Router)

  ngOnInit(): void {
    this.signupForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required,Validators.minLength(8)]),
        confirmPassword: new FormControl('',[Validators.required]),
      },
      { validators: this.passwordConfirmation }
    );
  }

  passwordConfirmation(form: AbstractControl): { invalid: boolean } | null {
    if (form.get('password')?.value !== form.get('confirmPassword')?.value) {
      return { invalid: true };
    }
    return null;
  }
  
  onSubmit(){
    if(this.signupForm.invalid) return;
    const { email, password} = this.signupForm.value;
    this.authService.signup({email,password}).subscribe({
      next:(res) => this.router.navigate(['todos']),
      error:(err) => console.error(err)
    })
  }
}
