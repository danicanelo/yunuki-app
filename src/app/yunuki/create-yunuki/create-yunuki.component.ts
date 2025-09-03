import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { YunukiService } from '../../services/yunuki.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Breed } from '../../interfaces/breed.interface';
import { Yunuki } from '../../interfaces/yunuki.interface';
import { User } from '../../interfaces/user.interface';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-create-yunuki',
  standalone: true,
  imports: [NavbarComponent, FormsModule],
  templateUrl: './create-yunuki.component.html',
  styleUrl: './create-yunuki.component.css'
})
export class CreateYunukiComponent implements OnInit {
  username = '';
  breeds: Breed[] = [];
  selectedBreed = 0;
  createValues = {
    yunukiName: '',
    breed: 1
  };

  constructor(private authService: AuthService, private yunukiService: YunukiService, private router: Router, private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.loadingService.show();
    this.authService.getUser().subscribe((user: User) => {
      this.username = user.username;
      user.yunukis?.forEach((yunuki: Yunuki) => {
        if (!yunuki.dead) {
          this.loadingService.hide();
          this.router.navigate(['/yunuki']);
        }
      });
    }, (error) => {
      this.loadingService.hide();
      console.error('Error fetching user:', error);
    });

    this.yunukiService.getBreeds().subscribe((breeds) => {
      this.breeds = breeds;
      this.loadingService.hide();
    })
  }

  handleSubmit() {
    this.loadingService.show();
    this.yunukiService.createYunuki(this.createValues.yunukiName, this.createValues.breed).subscribe((result) => {
      this.loadingService.hide();
      this.router.navigate(['/yunuki']);
    }, (error) => {
      this.loadingService.hide();
      console.error('Error creating Yunuki:', error);
    })
  }

  handleChange(event: any) {
    const { name, value } = event.target;
    this.createValues = {
      ...this.createValues,
      [name]: value
    };
    if (name === 'breed') {
      this.selectedBreed = value - 1;
    }
  }
}
