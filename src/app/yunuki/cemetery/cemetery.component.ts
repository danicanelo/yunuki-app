import { Component, OnInit } from '@angular/core';
import { GraveComponent } from './grave/grave.component';
import { YunukiService } from '../../services/yunuki.service';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { Yunuki } from '../../interfaces/yunuki.interface';

@Component({
  selector: 'app-cemetery',
  standalone: true,
  imports: [GraveComponent, NavbarComponent],
  templateUrl: './cemetery.component.html',
  styleUrl: './cemetery.component.css'
})
export class CemeteryComponent implements OnInit {
  deadYunukis: Yunuki[] = [];

  constructor(private yunukiService: YunukiService) { }

  ngOnInit(): void {
    this.yunukiService.getDeadYunukis().subscribe({
      next: (deadYunukis: Yunuki[]) => {
        this.deadYunukis = deadYunukis;
      }
    });

  }
}
