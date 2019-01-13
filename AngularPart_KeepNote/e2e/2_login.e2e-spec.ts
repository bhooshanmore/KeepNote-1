import { LoginPage } from './page-objects/login.po';
 import { browser, by, element, ElementFinder, promise } from 'protractor';

describe('login page', () => {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
  });


  it('When page is loaded, user is redirected to login screen', () => {
    page.navigateToLogin();
    
    expect(page.getCurrentURL()).toContain('login');
    //browser.sleep(3000);
    });

  it('should login into the system, notes view is displayed', () => {
    page.navigateToLogin();
    let newNoteValues = page.addLoginValues();
    expect(page.getLoginInputBoxesDefaultValues()).toEqual(newNoteValues, 'Should be able to set values for username and password');
    
  //const inputElement = element.all(by.css('input'));
  //inputElement.get(0).sendKeys('krishna');
  //inputElement.get(1).sendKeys('123456'); 

    page.clickSubmitButton();
    expect(page.getCurrentURL()).toContain('dashboard/view/noteview');
  });
});