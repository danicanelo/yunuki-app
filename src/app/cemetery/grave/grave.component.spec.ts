import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraveComponent } from './grave.component';

describe('GraveComponent', () => {
  let component: GraveComponent;
  let fixture: ComponentFixture<GraveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
