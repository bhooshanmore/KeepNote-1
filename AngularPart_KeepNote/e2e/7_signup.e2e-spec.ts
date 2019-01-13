import { LoginPage } from './page-objects/login.po';
import { browser, by, element, ElementFinder, promise, protractor } from 'protractor';

describe('Signup page', () => {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
  });

  it('When page is loaded, on click of signup button, user is redirected to signup page', () => {
    page.navigateToLogin();
    expect(page.getCurrentURL()).toContain('login');
    element(by.buttonText('Sign Up')).click();
    expect(page.getCurrentURL()).toContain('signup');

  }); 

  it('Sign Up Functionality test ', () => {
    page.navigateToSignup();
    
  //const inputElement = element.all(by.css('input'));
  element(by.id('inputUserId')).sendKeys('Abcd123');
  element(by.id('inputPassword')).sendKeys('123456'); 
  element(by.id('inputFirstname')).sendKeys('Gokula'); 
  element(by.id('inputLastname')).sendKeys('Krishna'); 
  element(by.id('inputuserMobile')).sendKeys('9584568745');
  element(by.css("input[type=checkbox]")).click();
  element(by.cssContainingText('option', 'Developer')).click();

  element(by.css("button[type=submit]")).click();
  
 // var EC = protractor.ExpectedConditions;
// Waits for an alert pops up.
 // browser.wait(EC.alertIsPresent(), 1000);

  });

});