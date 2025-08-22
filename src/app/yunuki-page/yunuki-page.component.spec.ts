import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YunukiPageComponent } from './yunuki-page.component';

describe('YunukiPageComponent', () => {
  let component: YunukiPageComponent;
  let fixture: ComponentFixture<YunukiPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YunukiPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YunukiPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
