import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExemplosHomeComponent } from './exemplos-home.component';

describe('ExemplosHomeComponent', () => {
  let component: ExemplosHomeComponent;
  let fixture: ComponentFixture<ExemplosHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExemplosHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExemplosHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
