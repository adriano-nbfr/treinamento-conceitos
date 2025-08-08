import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoWayPai } from './two-way-pai';

describe('TwoWayPai', () => {
  let component: TwoWayPai;
  let fixture: ComponentFixture<TwoWayPai>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwoWayPai]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoWayPai);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
