import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { YunukiService } from '../../services/yunuki.service';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { YunukiComponent } from './yunuki/yunuki.component';
import { Yunuki } from '../../interfaces/yunuki.interface';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-yunuki-page',
  standalone: true,
  imports: [NavbarComponent, CommonModule, YunukiComponent],
  templateUrl: './yunuki-page.component.html',
  styleUrl: './yunuki-page.component.css'
})
export class YunukiPageComponent implements OnInit, OnDestroy {
  yunuki!: Yunuki;
  fetchInterval: any = null;
  modalOpen = false;
  action = '';

  constructor(private yunukiService: YunukiService, private authService: AuthService, private router: Router, private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.loadingService.show();
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
      this.fetchYunukiDataRecursively();
    }, 20000);
  }

  private fetchYunukiData(): void {
    this.yunukiService.getAliveYunuki().subscribe({
      next: (yunuki) => {
        this.yunuki = yunuki;
        this.loadingService.hide();
      },
      error: (err) => {
        console.error('Error fetching Yunuki data:', err);
        this.loadingService.hide();
        this.router.navigate(['/create-yunuki']);
      }
    })
  }

  private fetchYunukiDataRecursively(): void {
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
    this.loadingService.show();
    if (this.yunuki.hunger === 0) {
      this.action = 'no tiene hambre';
    } else if (this.yunuki.hunger > 0) {
      this.action = 'ha comido';
    };

    this.yunukiService.feedYunuki().subscribe({
      next: (feededYunuki) => {
        this.yunuki = feededYunuki;
        this.loadingService.hide();
        this.modalOpen = true;
      },
      error: (err) => {
        this.loadingService.hide();
        console.error('Error fetching Yunuki data:', err);
      }
    })
  }

  cleanYunuki(): void {
    this.loadingService.show();
    if (this.yunuki.dirt === 0) {
      this.action = 'no necesita bañarse';
    } else if (this.yunuki.dirt > 0) {
      this.action = 'se ha dado un baño';
    };

    this.yunukiService.cleanYunuki().subscribe({
      next: (cleanedYunuki) => {
        this.yunuki = cleanedYunuki;
        this.loadingService.hide();
        this.modalOpen = true;
      },
      error: (err) => {
        this.loadingService.hide();
        console.error('Error fetching Yunuki data:', err);
      }
    })
  }

  sleepYunuki(): void {
    this.loadingService.show();
    if (this.yunuki.tiredness === 0) {
      this.action = 'no necesita dormir';
    } else if (this.yunuki.tiredness > 0) {
      this.action = 'ha descansado';
    };

    this.yunukiService.sleepYunuki().subscribe({
      next: (sleptYunuki) => {
        this.yunuki = sleptYunuki;
        this.loadingService.hide();
        this.modalOpen = true;
      },
      error: (err) => {
        this.loadingService.hide();
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
