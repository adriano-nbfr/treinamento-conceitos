import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalMaisSistemasComponent } from './portal-mais-sistemas.component';

describe('PortalMaisSistemasComponent', () => {
  let component: PortalMaisSistemasComponent;
  let fixture: ComponentFixture<PortalMaisSistemasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortalMaisSistemasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortalMaisSistemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
