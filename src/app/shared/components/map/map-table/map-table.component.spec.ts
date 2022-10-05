import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapTableComponent } from './map-table.component';

describe('MapTableComponent', () => {
  let component: MapTableComponent;
  let fixture: ComponentFixture<MapTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
