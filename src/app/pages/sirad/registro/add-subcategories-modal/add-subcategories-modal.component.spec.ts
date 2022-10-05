import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubcategoriesModalComponent } from './add-subcategories-modal.component';

describe('AddSubcategoriesModalComponent', () => {
  let component: AddSubcategoriesModalComponent;
  let fixture: ComponentFixture<AddSubcategoriesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubcategoriesModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubcategoriesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
