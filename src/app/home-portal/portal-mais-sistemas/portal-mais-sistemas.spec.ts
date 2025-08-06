import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalMaisSistemas } from './portal-mais-sistemas';

describe('PortalMaisSistemas', () => {
  let component: PortalMaisSistemas;
  let fixture: ComponentFixture<PortalMaisSistemas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortalMaisSistemas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortalMaisSistemas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
