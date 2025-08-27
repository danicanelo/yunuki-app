import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { YunukiService } from '../../services/yunuki.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-yunuki',
  standalone: true,
  imports: [NavbarComponent, FormsModule],
  templateUrl: './create-yunuki.component.html',
  styleUrl: './create-yunuki.component.css'
})
export class CreateYunukiComponent implements OnInit {
  username = '';
  breeds: any[] = [];
  selectedBreed = 0;
  createValues = {
    yunukiName: '',
    breed: 1
  };

  constructor(private authService: AuthService, private yunukiService: YunukiService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe((user: any) => {
      this.username = user.username;
      user.yunukis.forEach((yunuki: any) => {
        if (!yunuki.dead) {
          this.router.navigate(['/yunuki']);
        }
      });
    }, (error) => {
      console.error('Error fetching user:', error);
    });

    this.yunukiService.getBreeds().subscribe((breeds) => {
      this.breeds = breeds;
    })
  }

  handleSubmit() {
    this.yunukiService.createYunuki(this.createValues.yunukiName, this.createValues.breed).subscribe((result) => {
      this.router.navigate(['/yunuki']);
    }, (error) => {
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
