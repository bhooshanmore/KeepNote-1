import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCategoryViewComponent } from './edit-category-view.component';

describe('EditCategoryViewComponent', () => {
  let component: EditCategoryViewComponent;
  let fixture: ComponentFixture<EditCategoryViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCategoryViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCategoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
