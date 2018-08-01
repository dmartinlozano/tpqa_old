import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { ResetPasswordComponent} from './pages/reset-password/reset-password.component';
import { RegisterComponent } from './pages/register/register.component';
import { TestSpecificationListComponent } from './pages/test-specification/test-specification-list/test-specification-list.component';
import { TestProjectListComponent } from './pages/test-project/test-project-list/test-project-list.component';
import { UserTabComponent } from './pages/user/user-tab/user-tab.component';
import {OptionsComponent } from './pages/options/options.component';

const routes: Routes = [
    { path: '', component: LoginComponent},
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'reset-password/:userId', component: ResetPasswordComponent},
    { path: 'test-specifications/:testProjectId', component: TestSpecificationListComponent, canActivate: [AuthGuard] },
    { path: 'test-projects', component: TestProjectListComponent, canActivate: [AuthGuard] },
    { path: 'users', component: UserTabComponent, canActivate: [AuthGuard] },
    { path: 'options', component: OptionsComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
