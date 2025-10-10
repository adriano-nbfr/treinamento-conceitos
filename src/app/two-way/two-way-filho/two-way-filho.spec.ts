import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoWayFilho } from './two-way-filho';

describe('TwoWayFilho', () => {
  let component: TwoWayFilho;
  let fixture: ComponentFixture<TwoWayFilho>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwoWayFilho]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoWayFilho);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
