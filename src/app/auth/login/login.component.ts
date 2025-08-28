import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  username = '';
  password = '';
  error = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe({
      next: (user: any) => {
        user.yunukis.forEach((yunuki: any) => {
          if (yunuki.dead === null || yunuki.dead === undefined) {
            this.router.navigate(['/yunuki']);
          } else {
            this.router.navigate(['/create']);
          }
        });
      }
    })
  }

  onSubmit(form: any) {
    if (form.valid && !this.loading) {
      this.loading = true;
      this.error = '';
      this.username = form.value.username;
      this.password = form.value.password;
      console.log('Formulario', form.value);
      this.authService.login(this.username, this.password).subscribe({
        next: (response) => {
          this.loading = false;
          console.log('Éxito', response.access_token);
          this.router.navigate(['/create']);
        },
        error: (err) => {
          this.loading = false;
          this.error = 'Credenciales incorrectas';
          console.log('Error', err);
        }
      })
    }
  }

  clearError(): void {
    this.error = '';
  }
}
