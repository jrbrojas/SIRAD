import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilAddComponent } from './perfil-add.component';

describe('PerfilAddComponent', () => {
  let component: PerfilAddComponent;
  let fixture: ComponentFixture<PerfilAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
