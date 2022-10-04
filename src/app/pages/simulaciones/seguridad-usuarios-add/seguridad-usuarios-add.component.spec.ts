import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguridadUsuariosAddComponent } from './seguridad-usuarios-add.component';

describe('SeguridadUsuariosAddComponent', () => {
  let component: SeguridadUsuariosAddComponent;
  let fixture: ComponentFixture<SeguridadUsuariosAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeguridadUsuariosAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguridadUsuariosAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
