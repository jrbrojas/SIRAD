import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVerSolicitudComponent } from './modal-ver-solicitud.component';

describe('ModalVerSolicitudComponent', () => {
  let component: ModalVerSolicitudComponent;
  let fixture: ComponentFixture<ModalVerSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalVerSolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVerSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
