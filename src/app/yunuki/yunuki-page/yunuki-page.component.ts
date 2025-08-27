import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { YunukiService } from '../../services/yunuki.service';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { YunukiComponent } from './yunuki/yunuki.component';

@Component({
  selector: 'app-yunuki-page',
  standalone: true,
  imports: [NavbarComponent, CommonModule, YunukiComponent],
  templateUrl: './yunuki-page.component.html',
  styleUrl: './yunuki-page.component.css'
})
export class YunukiPageComponent implements OnInit, OnDestroy {
  yunuki: any = null;
  fetchInterval: any = null;
  modalOpen = false;
  action = '';

  constructor(private yunukiService: YunukiService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.initializeYunuki();
  }

  ngOnDestroy(): void {
    if (this.fetchInterval) {
      clearInterval(this.fetchInterval);
    };
  }

  private initializeYunuki(): void {
    this.fetchYunukiData();
    this.fetchInterval = setInterval(() => {
      this.fetchYunukiData();
    }, 20000);
  }

  private fetchYunukiData(): void {
    this.yunukiService.getAliveYunuki().subscribe({
      next: (yunuki) => {
        this.yunuki = yunuki;
        console.log('Yunuki data fetched:', this.yunuki);
      },
      error: (err) => {
        console.error('Error fetching Yunuki data:', err);
        this.router.navigate(['/create-yunuki']);
      }
    })
  }

  feedYunuki(): void {
    if (this.yunuki.hunger === 0) {
      this.action = 'no tiene hambre';
    } else if (this.yunuki.hunger > 0) {
      this.action = 'ha comido';
    };

    this.yunukiService.feedYunuki().subscribe({
      next: (feededYunuki) => {
        this.yunuki = feededYunuki;
        this.modalOpen = true;
      },
      error: (err) => {
        console.error('Error fetching Yunuki data:', err);
      }
    })
  }

  cleanYunuki(): void {
    if (this.yunuki.dirt === 0) {
      this.action = 'no necesita bañarse';
    } else if (this.yunuki.dirt > 0) {
      this.action = 'se ha dado un baño';
    };

    this.yunukiService.cleanYunuki().subscribe({
      next: (cleanedYunuki) => {
        this.yunuki = cleanedYunuki;
        this.modalOpen = true;
      },
      error: (err) => {
        console.error('Error fetching Yunuki data:', err);
      }
    })
  }

  sleepYunuki(): void {
    if (this.yunuki.tiredness === 0) {
      this.action = 'no necesita dormir';
    } else if (this.yunuki.tiredness > 0) {
      this.action = 'ha descansado';
    };

    this.yunukiService.sleepYunuki().subscribe({
      next: (sleptYunuki) => {
        this.yunuki = sleptYunuki;
        this.modalOpen = true;
      },
      error: (err) => {
        console.error('Error fetching Yunuki data:', err);
      }
    })
  }

  toggleModal(): void {
    this.modalOpen = !this.modalOpen;
  }

  setAction(action: string): void {
    this.action = action;
  }

}
