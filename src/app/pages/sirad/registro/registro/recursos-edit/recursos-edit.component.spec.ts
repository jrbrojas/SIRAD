import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursosEditComponent } from './recursos-edit.component';

describe('RecursosEditComponent', () => {
  let component: RecursosEditComponent;
  let fixture: ComponentFixture<RecursosEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecursosEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecursosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
