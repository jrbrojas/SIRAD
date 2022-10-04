import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguridadPerfilesComponent } from './seguridad-perfiles.component';

describe('SeguridadPerfilesComponent', () => {
  let component: SeguridadPerfilesComponent;
  let fixture: ComponentFixture<SeguridadPerfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeguridadPerfilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguridadPerfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
