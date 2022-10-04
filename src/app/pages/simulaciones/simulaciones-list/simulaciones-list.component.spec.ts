import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulacionesListComponent } from './simulaciones-list.component';

describe('SimulacionesListComponent', () => {
  let component: SimulacionesListComponent;
  let fixture: ComponentFixture<SimulacionesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimulacionesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulacionesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
