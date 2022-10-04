import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguridadPermisosAddComponent } from './seguridad-permisos-add.component';

describe('SeguridadPermisosAddComponent', () => {
  let component: SeguridadPermisosAddComponent;
  let fixture: ComponentFixture<SeguridadPermisosAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeguridadPermisosAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguridadPermisosAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
