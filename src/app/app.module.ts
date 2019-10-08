import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import bootstrap from "bootstrap";
import { NgxPaginationModule } from 'ngx-pagination';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';
import { AuthGuard } from './auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { PostComponent } from './post/post.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent,
    NoAccessComponent,
    NotFoundComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxPaginationModule,
    RouterModule.forRoot([
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'NoAccess',
        component: NoAccessComponent
      },
      {
        path: 'contact',
        component: ContactComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'posts',
        component: HomeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'posts/:id',
        component: PostComponent,
        canActivate: [AuthGuard]
      },
      {
        path: '',
        redirectTo: 'posts',
        pathMatch: 'full',
        canActivate: [AuthGuard]
      },
      {
        path: '**',
        component: NotFoundComponent,
      }
    ])
  ],
  providers: [AuthService, ApiService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
