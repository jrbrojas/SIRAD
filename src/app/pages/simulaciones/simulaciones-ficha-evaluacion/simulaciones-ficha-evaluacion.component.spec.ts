import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulacionesFichaEvaluacionComponent } from './simulaciones-ficha-evaluacion.component';

describe('SimulacionesFichaEvaluacionComponent', () => {
  let component: SimulacionesFichaEvaluacionComponent;
  let fixture: ComponentFixture<SimulacionesFichaEvaluacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimulacionesFichaEvaluacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulacionesFichaEvaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
