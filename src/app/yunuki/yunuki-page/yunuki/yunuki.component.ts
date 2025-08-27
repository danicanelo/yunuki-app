import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Yunuki } from '../../../services/yunuki.service';

@Component({
  selector: 'app-yunuki',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './yunuki.component.html',
  styleUrl: './yunuki.component.css'
})
export class YunukiComponent {
  @Input() yunuki: any;

  isHungry() {
    return this.yunuki.hunger >= 2;
  }

  isDirty() {
    return this.yunuki.dirt >= 4;
  }

  isTired() {
    return this.yunuki.tiredness >= 5;
  }

  yunukiSmall(yunuki: any, date: Date) {
    const diff = date.getTime() - new Date(yunuki.birth).getTime();
    const days = diff / (1000 * 60 * 60 * 24);
    if (days < 1) {
      return true;
    } else {
      return false;
    }
  }

  yunukiMid(yunuki: any, date: Date) {
    const diff = date.getTime() - new Date(yunuki.birth).getTime();
    const days = diff / (1000 * 60 * 60 * 24);
    if (days >= 1 && days < 2) {
      return true;
    } else {
      return false;
    }
  }

  getGlobalClass() {
    let globalClass = "yunuki mx-auto";
    if (this.isTired()) {
      globalClass += " tired";
    }
    if (this.isDirty()) {
      globalClass += " dirt";
    }
    if (this.yunuki.breed.name === 'Yiniki') {
      globalClass += " yiniki";
    }
    if (this.yunuki.breed.name === 'Yonoko') {
      globalClass += " yonoko";
    }
    if (this.yunukiSmall(this.yunuki, new Date())) {
      globalClass += " small-yunuki";
    }
    if (this.yunukiMid(this.yunuki, new Date())) {
      globalClass += " mid-yunuki";
    }
    return globalClass;
  }

  getEyeClass() {
    let eyeClass = "eye";
    if (this.isTired()) {
      eyeClass += "  tired-eye";
    }
    return eyeClass;
  }

  getMouthClass() {
    let mouthClass = "mouth";
    if (this.isTired()) {
      mouthClass += " tired-mouth";
    }
    if (this.isHungry()) {
      mouthClass += " hungry-mouth";
    }
    return mouthClass;
  }

  getLegClass() {
    let legClass = "leg";
    if (this.isTired()) {
      legClass += " tired-leg";
    }
    return legClass;
  }
}
