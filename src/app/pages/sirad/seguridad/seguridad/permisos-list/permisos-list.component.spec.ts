import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisosListComponent } from './permisos-list.component';

describe('PermisosListComponent', () => {
  let component: PermisosListComponent;
  let fixture: ComponentFixture<PermisosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermisosListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermisosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
