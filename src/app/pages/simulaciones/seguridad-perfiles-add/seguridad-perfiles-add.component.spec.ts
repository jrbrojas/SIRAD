import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguridadPerfilesAddComponent } from './seguridad-perfiles-add.component';

describe('SeguridadPerfilesAddComponent', () => {
  let component: SeguridadPerfilesAddComponent;
  let fixture: ComponentFixture<SeguridadPerfilesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeguridadPerfilesAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguridadPerfilesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
