import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateYunukiComponent } from './create-yunuki.component';

describe('CreateYunukiComponent', () => {
  let component: CreateYunukiComponent;
  let fixture: ComponentFixture<CreateYunukiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateYunukiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateYunukiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
