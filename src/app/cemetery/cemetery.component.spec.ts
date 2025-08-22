import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CemeteryComponent } from './cemetery.component';

describe('CemeteryComponent', () => {
  let component: CemeteryComponent;
  let fixture: ComponentFixture<CemeteryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CemeteryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CemeteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
