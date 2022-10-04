import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulacionesDetailsComponent } from './simulaciones-details.component';

describe('SimulacionesDetailsComponent', () => {
  let component: SimulacionesDetailsComponent;
  let fixture: ComponentFixture<SimulacionesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimulacionesDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulacionesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
