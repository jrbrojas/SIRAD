import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguridadUsuariosSolicitudAddComponent } from './seguridad-usuarios-solicitud-add.component';

describe('SeguridadUsuariosSolicitudAddComponent', () => {
  let component: SeguridadUsuariosSolicitudAddComponent;
  let fixture: ComponentFixture<SeguridadUsuariosSolicitudAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeguridadUsuariosSolicitudAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguridadUsuariosSolicitudAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
