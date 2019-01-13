import { Component, OnInit } from '@angular/core';
import { Category } from '../category';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { RouterService } from '../services/router.service';
import { MatDialog } from '@angular/material';
import { EditCategoryViewComponent } from '../edit-category-view/edit-category-view.component';

@Component({
  selector: 'app-edit-category-opener',
  templateUrl: './edit-category-opener.component.html',
  styleUrls: ['./edit-category-opener.component.css']
})
export class EditCategoryOpenerComponent implements OnInit {

  categoryId: string;
  category: Category;
  constructor(private activateRoute: ActivatedRoute, private categoryService: CategoryService,
    private routerService: RouterService, private matdialog: MatDialog) {
    this.activateRoute.params.subscribe(param => this.categoryId = param.categoryId);
    this.categoryService.getCategoryById(this.categoryId).subscribe(res => {
      this.category = res;
      this.matdialog.open(EditCategoryViewComponent, {
        data: this.category
      }).afterClosed().subscribe(result => {
        this.routerService.routeBack();
      });
    });
  }

  ngOnInit() {
  }

}
