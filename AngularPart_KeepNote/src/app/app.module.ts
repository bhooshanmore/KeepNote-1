import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NoteTakerComponent } from './note-taker/note-taker.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { NoteComponent } from './note/note.component';
import { EditNoteOpenerComponent } from './edit-note-opener/edit-note-opener.component';
import { EditNoteViewComponent } from './edit-note-view/edit-note-view.component';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule,MatCheckboxModule  } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { NotesService } from './services/notes.service';
import { RouterService } from './services/router.service';
import { AuthenticationService } from './services/authentication.service';
import { ListViewComponent } from './list-view/list-view.component';
import { UserComponent } from './user/user.component';
import { CategoryComponent } from './category/category.component';
import { ReminderComponent } from './reminder/reminder.component';
import { SignupComponent } from './signup/signup.component';
import { EditCategoryOpenerComponent } from './edit-category-opener/edit-category-opener.component';
import { EditCategoryViewComponent } from './edit-category-view/edit-category-view.component';
import { EditReminderOpenerComponent } from './edit-reminder-opener/edit-reminder-opener.component';
import { EditReminderViewComponent } from './edit-reminder-view/edit-reminder-view.component';
import { ReminderService } from './services/reminder.service';
import { CategoryService } from './services/category.service';
import { UserService } from './services/user.service';
import { MatMenuModule} from '@angular/material/menu';
import { EditUserViewComponent } from './edit-user-view/edit-user-view.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      {
        path: 'view/noteview', component: NoteViewComponent
      },
      {
        path: 'view/listview', component: ListViewComponent
      },
      {
        path: 'note/:noteId/edit', component: EditNoteOpenerComponent,
        outlet: 'noteEditOutlet'
      },
      {
        path: '', redirectTo: 'view/noteview', pathMatch: 'full'
      }
    ]
  },
  {
    path: 'category', component: CategoryComponent,
    children: [{
      path: 'category/:categoryId/edit', component: EditCategoryOpenerComponent, outlet: 'categoryEditOutlet'
    },
    {
      path: 'view/noteview/:categoryId', component: NoteViewComponent,runGuardsAndResolvers: 'always',
    },
    {
      path: 'view/listview/:categoryId', component: ListViewComponent,runGuardsAndResolvers: 'always',
    }]
  },
  {
    path: 'reminder', component: ReminderComponent,
    children: [{
      path: 'reminder/:reminderId/edit', component: EditReminderOpenerComponent, outlet: 'reminderEditOutlet'
    },
    {
      path: 'view/noteview/:reminderId', component: NoteViewComponent,runGuardsAndResolvers: 'always',
    },
    {
      path: 'view/listview/:reminderId', component: ListViewComponent,runGuardsAndResolvers: 'always',
    }]
  },
  { path: 'user', component: UserComponent },
  { path: 'user/edit/:userId', component: EditUserViewComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    NoteTakerComponent,
    NoteViewComponent,
    ListViewComponent,
    NoteComponent,
    EditNoteOpenerComponent,
    EditNoteViewComponent,
    UserComponent,
    CategoryComponent,
    ReminderComponent,
    EditCategoryOpenerComponent,
    EditCategoryViewComponent,
    SignupComponent,
    EditReminderOpenerComponent,
    EditReminderViewComponent,
    EditUserViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes,{onSameUrlNavigation: 'reload'}),
    FormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    MatMenuModule,
  ],
  providers: [NotesService, RouterService, AuthenticationService, ReminderService, CategoryService, UserService],
  bootstrap: [AppComponent],
  entryComponents: [EditNoteViewComponent, EditCategoryViewComponent, EditReminderViewComponent]
})

export class AppModule { }
