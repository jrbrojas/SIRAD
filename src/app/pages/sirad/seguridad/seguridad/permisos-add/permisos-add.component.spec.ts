import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisosAddComponent } from './permisos-add.component';

describe('PermisosAddComponent', () => {
  let component: PermisosAddComponent;
  let fixture: ComponentFixture<PermisosAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermisosAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermisosAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
