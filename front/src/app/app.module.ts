import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SafeHtmlPipe } from './pipes/safehtml.pipe';
import { Html2TextPipe } from './pipes/html2text.pipe';
import { TestProjectsOptionsPipe } from './pipes/test-projects-options.pipe';

import { LocalStorageService } from './auth/local-storage.service'

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard'
import { NavbarComponent } from './web-components/navbar/navbar.component';
import { TreeModule} from './web-components/tree/tree.module';
import { TestSpecificationListComponent } from './pages/test-specification/test-specification-list/test-specification-list.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { TestProjectListComponent } from './pages/test-project/test-project-list/test-project-list.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { TestProjectDetailsComponent } from './pages/test-project/test-project-details/test-project-details.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SafeHtmlPipe,
    Html2TextPipe,
    TestProjectsOptionsPipe,
    TestSpecificationListComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    TestProjectListComponent,
    LogoutComponent,
    TestProjectDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TreeModule,
    BrowserAnimationsModule
  ],
  providers: [AuthGuard, LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
