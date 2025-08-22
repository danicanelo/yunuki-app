import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YunukiComponent } from './yunuki.component';

describe('YunukiComponent', () => {
  let component: YunukiComponent;
  let fixture: ComponentFixture<YunukiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YunukiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YunukiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
