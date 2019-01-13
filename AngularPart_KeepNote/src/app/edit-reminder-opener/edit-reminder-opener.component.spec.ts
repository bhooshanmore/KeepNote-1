import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReminderOpenerComponent } from './edit-reminder-opener.component';

describe('EditReminderOpenerComponent', () => {
  let component: EditReminderOpenerComponent;
  let fixture: ComponentFixture<EditReminderOpenerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditReminderOpenerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReminderOpenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
