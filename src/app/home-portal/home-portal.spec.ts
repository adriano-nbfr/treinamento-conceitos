import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePortal } from './home-portal';

describe('HomePortal', () => {
  let component: HomePortal;
  let fixture: ComponentFixture<HomePortal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePortal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePortal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
