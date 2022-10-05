import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursosAddComponent } from './recursos-add.component';

describe('RecursosAddComponent', () => {
  let component: RecursosAddComponent;
  let fixture: ComponentFixture<RecursosAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecursosAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecursosAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
