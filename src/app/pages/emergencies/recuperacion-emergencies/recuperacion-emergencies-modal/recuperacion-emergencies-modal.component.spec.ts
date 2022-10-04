import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperacionEmergenciesModalComponent } from './recuperacion-emergencies-modal.component';

describe('RecuperacionEmergenciesModalComponent', () => {
  let component: RecuperacionEmergenciesModalComponent;
  let fixture: ComponentFixture<RecuperacionEmergenciesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecuperacionEmergenciesModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperacionEmergenciesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
