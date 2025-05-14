import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErroNavegacaoComponent } from './erro-navegacao.component';

describe('ErroNavegacaoComponent', () => {
  let component: ErroNavegacaoComponent;
  let fixture: ComponentFixture<ErroNavegacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErroNavegacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErroNavegacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
