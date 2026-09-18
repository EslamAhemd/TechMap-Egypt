import { Component, inject } from '@angular/core';

import {
  FormsModule,
  NgForm
} from '@angular/forms';

import {
  Router,
  RouterLink
} from '@angular/router';

import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../services/user-service';



import { IuserResponse } from '../../models/iuser-response';
import { Iuser } from '../../models/iuser';

@Component({
  imports: [FormsModule, RouterLink],
  selector: "app-register",
  styleUrl: "./register.css",
  templateUrl: "./register.html",
})


export class Register {
  private userService = inject(UserService);
  private router = inject(Router);

  newUser: Iuser = {
    name: '',
    email: '',
    password: ''
  };

  confirmPassword = '';
  showPassword = false;
  showConfirmPassword = false;

  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  addNewUser(registerForm: NgForm): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (registerForm.invalid) {
      registerForm.control.markAllAsTouched();
      return;
    }

    if (
      this.newUser.password !==
      this.confirmPassword
    ) {
      this.errorMessage =
        'Password and confirm password do not match.';

      return;
    }

    this.isSubmitting = true;

    console.log('New user:', this.newUser);

    this.userService
      .register(this.newUser)
      .subscribe({
        next: (response: IuserResponse) => {
          this.isSubmitting = false;

          console.log('Register response:', response);

          if (response.err) {
            this.errorMessage =
              response.message ||
              'An error occurred while registering.';

            return;
          }

          this.successMessage =
            response.message ||
            'Account created successfully.';

          registerForm.resetForm();

          this.confirmPassword = '';

          setTimeout(() => {
            this.router.navigateByUrl('/login');
          }, 1000);
        },

        error: (error: HttpErrorResponse) => {
          this.isSubmitting = false;

          console.log('Register error:', error);

          this.errorMessage =
            error.error?.message ||
            error.error?.msg ||
            'An error occurred. Please try again.';
        },

        complete: () => {
          console.log('Register request completed');
        }
      });
  }
}