import { LoginPage } from './page-objects/login.po';
import { browser, by, element, ElementFinder, promise, protractor } from 'protractor';
import { NoteViewPage } from './page-objects/noteview.po';

describe('category page', () => {
    let page: LoginPage;
    let note: NoteViewPage;
    beforeEach(() => {
      page = new LoginPage();
      note = new NoteViewPage();
    });

    it('Menu slider Functionality', () => {
        note.navigateToCategoryView();
        element(by.css("button[type=menuslide]")).click();
        expect(element((by.id('menutext'))).getText()).toEqual('MENU');   
        expect(page.getCurrentURL()).toContain('categories');
      });
  
      it('Create Category', () => {
        element(by.css("button[type=categorybutton]")).click();
        element(by.id('categoryname')).sendKeys('Home');
        element(by.id('categorydesc')).sendKeys('Hello');
        element(by.css("button[type=categorysubmit]")).click();
      }); 

      it('Edit Category', () => {
        element(by.className('loadcategory')).click();
        const categoryElement = element.all(by.className('edit'));
        categoryElement.get(0).click();
        element(by.id('editCategoryName')).sendKeys('Home123');
        element(by.id('editCategoryDesc')).sendKeys('Home123');
        element(by.css("button[type=categoryupdate]")).click();
      }); 

      it('Delete Category', () => {
        element(by.className('loadcategory')).click();  
        const categoryElement = element.all(by.css("button[type=categorydeletebutton]"));
        categoryElement.get(0).click();     
      }); 

  
});