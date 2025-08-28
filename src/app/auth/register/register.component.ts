import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  loading = false;
  error = '';
  errors = {};
  username = '';
  email = '';
  password = '';
  errorEmail = '';
  errorPassword = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/yunuki']);
    }
  }

  onSubmit(form: any) {
    if (form.valid && !this.loading) {
      this.loading = true;
      this.error = '';
      this.username = form.value.username;
      this.email = form.value.email;
      this.password = form.value.password;
      this.authService.register(this.username, this.email, this.password).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          this.loading = false;
          if (err.hasOwnProperty('email') || err.hasOwnProperty('password')) {
            this.errorEmail = err.email || '';
            this.errorPassword = err.password || '';
          } else {
            this.error = err;
            this.errorEmail = '';
            this.errorPassword = '';
          }
        }
      });
    }
  }

  clearError(): void {
    this.error = '';
    this.errorEmail = '';
    this.errorPassword = '';
  }
}
