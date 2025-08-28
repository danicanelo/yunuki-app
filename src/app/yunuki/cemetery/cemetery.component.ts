import { Component, OnInit } from '@angular/core';
import { GraveComponent } from './grave/grave.component';
import { YunukiService } from '../../services/yunuki.service';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-cemetery',
  standalone: true,
  imports: [GraveComponent, NavbarComponent],
  templateUrl: './cemetery.component.html',
  styleUrl: './cemetery.component.css'
})
export class CemeteryComponent implements OnInit {
  deadYunukis: any[] = [];

  constructor(private yunukiService: YunukiService) { }

  ngOnInit(): void {
    this.yunukiService.getDeadYunukis().subscribe({
      next: (deadYunukis: any) => {
        this.deadYunukis = deadYunukis;
      }
    });

  }
}
