import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperacionEmergenciesComponent } from './recuperacion-emergencies.component';

describe('RecuperacionEmergenciesComponent', () => {
  let component: RecuperacionEmergenciesComponent;
  let fixture: ComponentFixture<RecuperacionEmergenciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecuperacionEmergenciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperacionEmergenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
