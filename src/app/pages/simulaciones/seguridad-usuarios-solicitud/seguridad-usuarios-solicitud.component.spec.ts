import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguridadUsuariosSolicitudComponent } from './seguridad-usuarios-solicitud.component';

describe('SeguridadUsuariosSolicitudComponent', () => {
  let component: SeguridadUsuariosSolicitudComponent;
  let fixture: ComponentFixture<SeguridadUsuariosSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeguridadUsuariosSolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguridadUsuariosSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
