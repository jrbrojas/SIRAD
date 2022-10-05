import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubcategoriesModalComponent } from './edit-subcategories-modal.component';

describe('EditSubcategoriesModalComponent', () => {
  let component: EditSubcategoriesModalComponent;
  let fixture: ComponentFixture<EditSubcategoriesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSubcategoriesModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSubcategoriesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
