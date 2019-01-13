import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Category } from '../category';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { error } from 'selenium-webdriver';
import { RouterService } from './router.service';

@Injectable()
export class CategoryService {
  public url = 'http://localhost:8083/api/v1/category';
  private categoryArr: Category[];
  private categoryBehavior: BehaviorSubject<Array<Category>>;

  constructor(private httpClient: HttpClient, private authService: AuthenticationService,
    private router: RouterService) {
    this.categoryArr = [];
    this.categoryBehavior = new BehaviorSubject(this.categoryArr);
  }

  createCategory(category: Category): Observable<Category> {
    const bearerToken = this.authService.getBearerToken();
    const userId = this.authService.getUserId();
    category.categoryCreatedBy = userId;
    return this.httpClient.post<Category>(`${this.url}`, category,
      { headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`) });
  }

  deleteCategory(categoryId): any {
    const bearerToken = this.authService.getBearerToken();
    return this.httpClient.delete<any>(`${this.url}/${categoryId}`,
      { headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`) });
  }

  updateCategory(category: Category): Observable<Category> {
    const bearerToken = this.authService.getBearerToken();
    const userId = this.authService.getUserId();
    category.categoryCreatedBy = userId;
    return this.httpClient.put<Category>(`${this.url}/${category.id}`, category,
      { headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`) });
  }

  getAllCategoryByUserId() {
    const bearerToken = this.authService.getBearerToken();
    const userId = this.authService.getUserId();
    if(userId === null || bearerToken === null){
      this.router.routeToLogin();
    }
    return this.httpClient.get<Array<Category>>(`${this.url}?userId=${userId}`,
      { headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`) }).subscribe(res => {
        this.categoryArr = res;
        this.categoryBehavior.next(this.categoryArr);
      }, error => {
        this.router.routeToLogin();
      });
  }

  getCategoryById(categoryId): Observable<Category> {
    const bearerToken = this.authService.getBearerToken();
    return this.httpClient.get<Category>(`${this.url}/${categoryId}`,
      { headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`) });
  }

  getAllCategories(): BehaviorSubject<Array<Category>> {
    return this.categoryBehavior;
  }

  getCategoriesForNotes(): Observable<Array<Category>> {
    const bearerToken = this.authService.getBearerToken();
    const userId = this.authService.getUserId();
    return this.httpClient.get<Array<Category>>(`${this.url}?userId=${userId}`,
      { headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`) });
  }
}
