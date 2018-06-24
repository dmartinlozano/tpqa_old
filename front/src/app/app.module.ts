import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SafeHtmlPipe } from './pipes/safehtml.pipe';
import { Html2TextPipe } from './pipes/html2text.pipe';
import { TestProjectsOptionsPipe } from './pipes/test-projects-options.pipe';
import { FileSizePipe } from './pipes/file-size.pipe';
import { FormatDatePipe } from './pipes/format-date.pipe';

import { LocalStorageService } from './auth/local-storage.service';
import { UIErrorHandler } from './auth/ui-error.handle';
import { TreeService } from './web-components/tree/tree.service';
import { FilesService } from './web-components/files/files.service';
import { UserService } from './pages/user/user.service';
import { TestSpecificationService } from './pages/test-specification/test-specification.service';
import { TestProjectService } from './pages/test-project/test-project.service';
import { LoginService } from './pages/login/login.service';
import { TestCaseService } from './pages/test-case/test-case.service';
import { TestSuiteService } from './pages/test-suite/test-suite.service';
import { RoleService } from './pages/role/role.service';

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
import { TestProjectNewEditComponent } from './pages/test-project/test-project-new-edit/test-project-new-edit.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { TestProjectDetailsComponent } from './pages/test-project/test-project-details/test-project-details.component';
import { TestSuiteDetailsComponent } from './pages/test-suite/test-suite-details/test-suite-details.component';
import { TestCaseDetailsComponent } from './pages/test-case/test-case-details/test-case-details.component';
import { FilesListViewComponent } from './web-components/files/files-list-view/files-list-view.component';
import { UserListComponent } from './pages/user/user-list/user-list.component';
import { UserTabComponent } from './pages/user/user-tab/user-tab.component';
import { RoleListComponent } from './pages/role/role-list/role-list.component';
import { RoleByTestProjectComponent } from './pages/role/role-by-test-project/role-by-test-project.component';
import { RoleByTestPlanComponent } from './pages/role/role-by-test-plan/role-by-test-plan.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SafeHtmlPipe,
    Html2TextPipe,
    TestProjectsOptionsPipe,
    FileSizePipe,
    FormatDatePipe,
    TestSpecificationListComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    TestProjectListComponent,
    LogoutComponent,
    TestProjectDetailsComponent,
    TestProjectNewEditComponent,
    TestSuiteDetailsComponent,
    TestCaseDetailsComponent,
    FilesListViewComponent,
    MdlFabMenuComponent,
    MdlFabMenuItemComponent,
    UserListComponent,
    UserTabComponent,
    RoleListComponent,
    RoleByTestProjectComponent,
    RoleByTestPlanComponent
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
    },
    {provide: ErrorHandler, useClass: UIErrorHandler},
    AuthGuard,
    LocalStorageService,
    TreeService,
    TreeService,
    FilesService,
    UserService,
    TestSpecificationService,
    TestProjectService,
    LoginService,
    TestCaseService,
    TestSuiteService,
    RoleService
  ],
  entryComponents: [TestProjectNewEditComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
