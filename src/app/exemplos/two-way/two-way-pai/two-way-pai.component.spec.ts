import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoWayPaiComponent } from './two-way-pai.component';

describe('TwoWayPaiComponent', () => {
  let component: TwoWayPaiComponent;
  let fixture: ComponentFixture<TwoWayPaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwoWayPaiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoWayPaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
