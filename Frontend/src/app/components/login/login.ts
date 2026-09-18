import { Component, inject } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  Router,
  RouterLink
} from '@angular/router';

import { HttpErrorResponse } from '@angular/common/http';

import { UserService } from '../../services/user-service';
import { IuserResponse } from '../../models/iuser-response';


@Component({
  selector: 'app-login',

  imports: [
    ReactiveFormsModule,
    RouterLink
  ],

  templateUrl: './login.html',
  styleUrl: './login.css'
})




export class Login {
  loginForm: FormGroup;

  private userService = inject(UserService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  showPassword = false;
  isSubmitting = false;
  errorMessage = '';

  constructor() {
    this.loginForm = this.formBuilder.group({

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8)
        ]
      ]
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onLogin(): void {
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    console.log('Login form data:', this.loginForm.value);

    this.userService
      .login(this.loginForm.value)
      .subscribe({
        next: (response: IuserResponse) => {
          this.isSubmitting = false;

          console.log('Login response:', response);

          if (!response.token) {
            this.errorMessage =
              response.message ||
              response.msg ||
              'Invalid email or password';

            return;
          }

          localStorage.setItem(
            'authToken',
            response.token
          );

          if (this.userService.isAdmin()) {
            this.router.navigateByUrl('/admin/users');
            return;
          }

          this.router.navigateByUrl('/');
        },

        error: (error: HttpErrorResponse) => {
          this.isSubmitting = false;

          console.log('Login error:', error);

          this.errorMessage =
            error.error?.message ||
            error.error?.msg ||
            'An error occurred. Please try again.';
        },

        complete: () => {
          console.log('Login request completed');
        }
      });
  }
}