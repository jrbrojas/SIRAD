import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulacionesSeguimientoReportesComponent } from './simulaciones-seguimiento-reportes.component';

describe('SimulacionesSeguimientoReportesComponent', () => {
  let component: SimulacionesSeguimientoReportesComponent;
  let fixture: ComponentFixture<SimulacionesSeguimientoReportesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimulacionesSeguimientoReportesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulacionesSeguimientoReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
