import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguridadPermisosComponent } from './seguridad-permisos.component';

describe('SeguridadPermisosComponent', () => {
  let component: SeguridadPermisosComponent;
  let fixture: ComponentFixture<SeguridadPermisosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeguridadPermisosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguridadPermisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
