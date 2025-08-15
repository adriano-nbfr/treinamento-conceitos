import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExemplosHome } from './exemplos-home';

describe('ExemplosHome', () => {
  let component: ExemplosHome;
  let fixture: ComponentFixture<ExemplosHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExemplosHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExemplosHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
