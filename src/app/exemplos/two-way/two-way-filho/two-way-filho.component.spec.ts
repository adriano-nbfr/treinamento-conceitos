import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoWayFilhoComponent } from './two-way-filho.component';

describe('TwoWayFilhoComponent', () => {
  let component: TwoWayFilhoComponent;
  let fixture: ComponentFixture<TwoWayFilhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwoWayFilhoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoWayFilhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
