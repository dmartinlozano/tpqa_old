import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SafeHtmlPipe } from './pipes/safehtml.pipe';
import { Html2TextPipe } from './pipes/html2text.pipe';
import { TestProjectsOptionsPipe } from './pipes/test-projects-options.pipe';
import { FileSizePipe } from './pipes/file-size.pipe';

import { LocalStorageService } from './auth/local-storage.service'
import { TreeService } from './web-components/tree/tree.service';

import { MdlModule } from '@angular-mdl/core';
import { MdlDatePickerModule } from '@angular-mdl/datepicker';
import { MdlPopoverModule } from '@angular-mdl/popover';
import { MdlExpansionPanelModule } from '@angular-mdl/expansion-panel';
import { MdlSelectModule } from '@angular-mdl/select';

import { MdlFabMenuComponent } from './web-components/fab-menu/fab-menu.component';
import { MdlFabMenuItemComponent } from './web-components/fab-menu/fab-menu-item.component';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard'
import { JwtInterceptor } from './auth/jwt.interceptor';
import { NavbarComponent } from './web-components/navbar/navbar.component';
import { TreeModule} from './web-components/tree/tree.module';
import { TestSpecificationListComponent } from './pages/test-specification/test-specification-list/test-specification-list.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { TestProjectListComponent } from './pages/test-project/test-project-list/test-project-list.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { TestProjectDetailsComponent } from './pages/test-project/test-project-details/test-project-details.component';
import { TestSuiteDetailsComponent } from './pages/test-suite/test-suite-details/test-suite-details.component';
import { TestCaseDetailsComponent } from './pages/test-case/test-case-details/test-case-details.component';
import { FilesComponent } from './web-components/files/files.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SafeHtmlPipe,
    Html2TextPipe,
    TestProjectsOptionsPipe,
    FileSizePipe,
    TestSpecificationListComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    TestProjectListComponent,
    LogoutComponent,
    TestProjectDetailsComponent,
    TestSuiteDetailsComponent,
    TestCaseDetailsComponent,
    FilesComponent,
    MdlFabMenuComponent,
    MdlFabMenuItemComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    TreeModule,
    BrowserAnimationsModule,
    FormsModule,
    MdlModule,
    MdlPopoverModule,
    MdlExpansionPanelModule,
    MdlDatePickerModule,
    MdlSelectModule
  ],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },AuthGuard, LocalStorageService, TreeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
