import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessibleCarouselComponent } from './accessible-carousel.component';

describe('AccessibleCarouselComponent', () => {
  let component: AccessibleCarouselComponent;
  let fixture: ComponentFixture<AccessibleCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessibleCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessibleCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
