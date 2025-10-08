import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalDestaques } from './portal-destaques';

describe('PortalDestaques', () => {
  let component: PortalDestaques;
  let fixture: ComponentFixture<PortalDestaques>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortalDestaques]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortalDestaques);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
