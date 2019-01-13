import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Category } from '../category';
import { CategoryService } from '../services/category.service';
import { RouterService } from '../services/router.service';
import { NotesService } from '../services/notes.service';
import { Noteuser } from '../noteuser';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  category: Category;
  categoryArr: Array<Category>;
  private errMessage: string;
  categoryName = new FormControl('', Validators.compose([Validators.required]));
  categoryDescription = new FormControl('', Validators.compose([Validators.required]));

  constructor(private categoryService: CategoryService, private routerService: RouterService,
    private noteService: NotesService) {
  }

  ngOnInit() {
    this.category = new Category();
    this.categoryArr = [];
    this.categoryService.getAllCategoryByUserId();
    this.categoryService.getAllCategories().subscribe(result => {
      this.categoryArr = result;
    })
  }

  createCategory() {
    this.category.categoryName = this.categoryName.value;
    this.category.categoryDescription = this.categoryDescription.value;
    this.categoryService.createCategory(this.category).subscribe(value => {
      this.categoryArr.push(value);
    });
  }

  deleteCategory(categoryId) {
    this.categoryService.deleteCategory(categoryId).subscribe(result => {
      const index = this.categoryArr.findIndex(ele => ele.id == categoryId);
      this.categoryArr.splice(index, 1);
      this.noteService.fetchNotesFromServer();
      this.noteService.getNotes().subscribe(res => {
        let noteuser = new Noteuser();
        res.forEach(note => {
          if (note.category != null && note.category.categoryId === categoryId) {
            note.category = null;
          }
        });
        noteuser.notes = res;
        console.log('Inside notes 12333' + JSON.stringify(noteuser));
        this.noteService.addUserNote(noteuser);
      });
    });
    this.routerService.routeToCategory();
  }

  updateCategory(categoryId) {
    this.routerService.routeToEditCategoryView(categoryId);
  }

  routeToNotes(categoryId) {
    this.routerService.routeToCategoryNotes(categoryId);
  }

}
