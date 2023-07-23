import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroUsuariosComponentComponent } from './tablero-usuarios-component.component';

describe('TableroUsuariosComponentComponent', () => {
  let component: TableroUsuariosComponentComponent;
  let fixture: ComponentFixture<TableroUsuariosComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableroUsuariosComponentComponent]
    });
    fixture = TestBed.createComponent(TableroUsuariosComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
