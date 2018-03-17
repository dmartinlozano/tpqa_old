import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NavbarComponent } from './web-components/navbar/navbar.component';
import { TreeModule} from './web-components/tree/tree.module';
import { TestSpecificationListComponent } from './pages/test-specification/test-specification-list/test-specification-list.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TestSpecificationListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TreeModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
