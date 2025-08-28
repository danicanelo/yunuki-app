import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-grave',
  standalone: true,
  imports: [],
  templateUrl: './grave.component.html',
  styleUrl: './grave.component.css'
})
export class GraveComponent {
  @Input() name: string = ''
  @Input() birthDate: Date = new Date();
  @Input() deadDate: Date = new Date();
  @Input() epitaph: string = '';

  get birthDateFormatted(): string {
    return new Date(this.birthDate).toLocaleDateString();
  }

  get deadDateFormatted(): string {
    return new Date(this.deadDate).toLocaleDateString();
  }
}
