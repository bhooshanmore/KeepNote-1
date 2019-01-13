import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReminderViewComponent } from './edit-reminder-view.component';

describe('EditReminderViewComponent', () => {
  let component: EditReminderViewComponent;
  let fixture: ComponentFixture<EditReminderViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditReminderViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReminderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
