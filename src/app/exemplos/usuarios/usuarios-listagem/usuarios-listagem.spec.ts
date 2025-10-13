import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosListagem } from './usuarios-listagem';

describe('UsuariosListagem', () => {
  let component: UsuariosListagem;
  let fixture: ComponentFixture<UsuariosListagem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosListagem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosListagem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
