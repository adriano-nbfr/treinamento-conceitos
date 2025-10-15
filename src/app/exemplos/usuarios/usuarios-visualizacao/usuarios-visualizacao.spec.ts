import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosVisualizacao } from './usuarios-visualizacao';

describe('UsuariosVisualizacao', () => {
  let component: UsuariosVisualizacao;
  let fixture: ComponentFixture<UsuariosVisualizacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosVisualizacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosVisualizacao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
