import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisosEditComponent } from './permisos-edit.component';

describe('PermisosEditComponent', () => {
  let component: PermisosEditComponent;
  let fixture: ComponentFixture<PermisosEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermisosEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermisosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
