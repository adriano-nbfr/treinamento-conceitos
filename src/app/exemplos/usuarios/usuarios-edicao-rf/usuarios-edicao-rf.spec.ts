import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosEdicaoRf } from './usuarios-edicao-rf';

describe('UsuariosEdicaoRf', () => {
  let component: UsuariosEdicaoRf;
  let fixture: ComponentFixture<UsuariosEdicaoRf>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosEdicaoRf]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosEdicaoRf);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
