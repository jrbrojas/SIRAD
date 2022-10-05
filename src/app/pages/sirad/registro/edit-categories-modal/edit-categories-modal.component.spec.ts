import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCategoriesModalComponent } from './edit-categories-modal.component';

describe('EditCategoriesModalComponent', () => {
  let component: EditCategoriesModalComponent;
  let fixture: ComponentFixture<EditCategoriesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCategoriesModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCategoriesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
