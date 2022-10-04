import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralReportesComponent } from './general-reportes.component';

describe('GeneralReportesComponent', () => {
  let component: GeneralReportesComponent;
  let fixture: ComponentFixture<GeneralReportesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralReportesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
