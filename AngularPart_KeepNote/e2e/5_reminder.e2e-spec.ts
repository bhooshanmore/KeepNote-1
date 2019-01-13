import { LoginPage } from './page-objects/login.po';
import { browser, by, element, ElementFinder, promise, protractor } from 'protractor';
import { NoteViewPage } from './page-objects/noteview.po';

describe('reminder page', () => {
  let page: LoginPage;
  let note: NoteViewPage;
  beforeEach(() => {
    page = new LoginPage();
    note = new NoteViewPage();
  });

  it('Create Reminder', () => {
    element(by.css("button[type=reminderbutton]")).click();
    element(by.id('remindername')).sendKeys('Voice Mail');
    element(by.id('reminderdesc')).sendKeys('Remind me at 7');
    element(by.id('remindertype')).sendKeys('Daily');
    element(by.css("button[type=remindersubmit]")).click();
  });

  it('Edit Reminder', () => {
    element(by.className('loadreminder')).click();
    const reminderElement = element.all(by.className('editreminder'));
    reminderElement.get(0).click();
    element(by.id('editreminderName')).sendKeys('Notification');
    element(by.id('editreminderDesc')).sendKeys('Go to walk');
    element(by.id('editreminderType')).sendKeys('Weekly');
    element(by.css("button[type=reminderupdate]")).click();
  });

  it('Delete Reminder', () => {
    element(by.className('loadreminder')).click();
    const reminderElement = element.all(by.css("button[type=reminderdeletebutton]"));
    reminderElement.get(0).click();
  });


}); 