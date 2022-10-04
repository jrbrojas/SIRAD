import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguridadUsuariosComponent } from './seguridad-usuarios.component';

describe('SeguridadUsuariosComponent', () => {
  let component: SeguridadUsuariosComponent;
  let fixture: ComponentFixture<SeguridadUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeguridadUsuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguridadUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
