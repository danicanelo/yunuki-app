import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  username = '';
  isActive = false;
  currentPath = '';
  hasDeadYunukis = false;

  constructor(private router: Router, private authService: AuthService) {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentPath = event.url;
    });
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe({
      next: (user: User) => {
        this.username = user.username;
        this.hasDeadYunukis = user.yunukis?.some((yunuki: any) => yunuki.dead !== null && yunuki.dead !== undefined) ?? false;
      },
      error: (err) => {
        console.error('Error obteniendo el usuario:', err);
        if (err.status === 401) {
          this.username = '';
          this.router.navigate(['/login']);
        }
      }
    });

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

  handleActive(): void {
    this.isActive = !this.isActive;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goToYunukiPage(): void {
    this.router.navigate(['/yunuki']);
  }

  goToCemeteryPage(): void {
    this.router.navigate(['/cemetery']);
  }

  get showYunukiLink(): boolean {
    return this.currentPath === '/cemetery';
  }

  get showCemeteryLink(): boolean {
    return this.currentPath === '/yunuki' && this.hasDeadYunukis;
  }



}
