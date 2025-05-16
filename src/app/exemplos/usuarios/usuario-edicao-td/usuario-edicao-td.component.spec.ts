import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioEdicaoTdComponent } from './usuario-edicao-td.component';

describe('UsuarioEdicaoTdComponent', () => {
  let component: UsuarioEdicaoTdComponent;
  let fixture: ComponentFixture<UsuarioEdicaoTdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioEdicaoTdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioEdicaoTdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
