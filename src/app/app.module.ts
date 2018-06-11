import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';

import { CoreModule } from './core/core.module';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginPageComponent } from './homepage/login-page/login-page.component';
import { TablePageComponent } from './homepage/table-page/table-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginPageComponent,
    TablePageComponent,
    DashboardPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
