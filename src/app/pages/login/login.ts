import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookingService } from '../../services/booking-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;
  showPassword = false;
  router = inject(Router);
  login = true;
  userDetails = inject(BookingService);

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    const { username, password } = this.loginForm.value;

    //Admin
    if (username === 'admin' && password === '1234') {
      alert(`Welcome back, ${username}!`);
      this.userDetails.username.next('admin');
      this.router.navigateByUrl('/dashboard');
      return;
    }

    //Session Storage
    else {
      const storedUser = sessionStorage.getItem('user');

      if (!storedUser) {
        alert('No user found. Please create an account.');
        return;
      }

      const user = JSON.parse(storedUser);
      if (username === user.username && password === user.password) {
        alert(`Welcome, ${user.username}!`);
        this.userDetails.username.next(user.username);
        this.router.navigateByUrl('/dashboard');
        return;
      }
      alert('Incorrect login cred');
    }
  }

  backtologin() {
    this.login = true;
  }

  createAccount() {
    this.login = false;
  }

  createNewAccount() {
    const formValue = this.loginForm.value;

    // if (formValue.password !== formValue.confirmPassword) {
    //   alert('Passwords do not match!');
    //   return;
    // }

    // Save user in sessionStorage
    sessionStorage.setItem(
      'user',
      JSON.stringify({
        username: formValue.username,
        password: formValue.password,
      })
    );

    alert('Account created successfully!');

    // Redirect to login
    this.router.navigateByUrl('/login');
  }
}
