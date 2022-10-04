import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudCredencialesComponent } from './solicitud-credenciales.component';

describe('SolicitudCredencialesComponent', () => {
  let component: SolicitudCredencialesComponent;
  let fixture: ComponentFixture<SolicitudCredencialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudCredencialesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudCredencialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
