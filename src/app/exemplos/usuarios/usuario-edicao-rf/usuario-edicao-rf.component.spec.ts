import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioEdicaoRfComponent } from './usuario-edicao-rf.component';

describe('UsuarioEdicaoRfComponent', () => {
  let component: UsuarioEdicaoRfComponent;
  let fixture: ComponentFixture<UsuarioEdicaoRfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioEdicaoRfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioEdicaoRfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
