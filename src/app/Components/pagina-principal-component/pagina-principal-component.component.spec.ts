import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaPrincipalComponentComponent } from './pagina-principal-component.component';

describe('PaginaPrincipalComponentComponent', () => {
  let component: PaginaPrincipalComponentComponent;
  let fixture: ComponentFixture<PaginaPrincipalComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginaPrincipalComponentComponent]
    });
    fixture = TestBed.createComponent(PaginaPrincipalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
