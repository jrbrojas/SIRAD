import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulacionesFichaEvaluacionDetalleComponent } from './simulaciones-ficha-evaluacion-detalle.component';

describe('SimulacionesFichaEvaluacionDetalleComponent', () => {
  let component: SimulacionesFichaEvaluacionDetalleComponent;
  let fixture: ComponentFixture<SimulacionesFichaEvaluacionDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimulacionesFichaEvaluacionDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulacionesFichaEvaluacionDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
