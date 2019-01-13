import { Component, OnInit, Inject } from '@angular/core';
import { Category } from '../category';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CategoryService } from '../services/category.service';
import { RouterService } from '../services/router.service';
import { NotesService } from '../services/notes.service';
import { Noteuser } from '../noteuser';

@Component({
  selector: 'app-edit-category-view',
  templateUrl: './edit-category-view.component.html',
  styleUrls: ['./edit-category-view.component.css']
})
export class EditCategoryViewComponent implements OnInit {

  private category: Category;
  errMessage: string;

  constructor(private dialog: MatDialogRef<EditCategoryViewComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private categoryService: CategoryService, private routerService: RouterService,
    private noteService: NotesService) {
    this.category = this.data;
  }

  ngOnInit() {
  }

  onSave() {
    this.categoryService.updateCategory(this.category).subscribe(res => {
      this.categoryService.getAllCategoryByUserId();
      this.noteService.fetchNotesFromServer();
      this.noteService.getNotes().subscribe(res => {
        let noteuser = new Noteuser();
        res.forEach(note => {
          if (note.category != null && note.category.categoryId === this.category.id) {
            note.category = this.category;
            note.category.categoryId = this.category.id;
          }
        });
        noteuser.notes = res;
        console.log('Inside notes 12333' + JSON.stringify(noteuser));
        this.noteService.addUserNote(noteuser);
      }, error => {
        this.errMessage = error.message;
      });
      this.dialog.close();
    });
}
}
