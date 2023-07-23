import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionUsuariosComponentComponent } from './gestion-usuarios-component.component';

describe('GestionUsuariosComponentComponent', () => {
  let component: GestionUsuariosComponentComponent;
  let fixture: ComponentFixture<GestionUsuariosComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionUsuariosComponentComponent]
    });
    fixture = TestBed.createComponent(GestionUsuariosComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
