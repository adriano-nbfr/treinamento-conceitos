import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosEdicaoTd } from './usuarios-edicao-td';

describe('UsuariosEdicaoTd', () => {
  let component: UsuariosEdicaoTd;
  let fixture: ComponentFixture<UsuariosEdicaoTd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosEdicaoTd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosEdicaoTd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
