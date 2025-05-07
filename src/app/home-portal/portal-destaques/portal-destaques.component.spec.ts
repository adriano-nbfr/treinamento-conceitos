import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalDestaquesComponent } from './portal-destaques.component';

describe('PortalDestaquesComponent', () => {
  let component: PortalDestaquesComponent;
  let fixture: ComponentFixture<PortalDestaquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortalDestaquesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortalDestaquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
