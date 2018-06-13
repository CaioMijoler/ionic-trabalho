import { ProgressBarComponent } from './../components/progress-bar/progress-bar';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AuthProvider } from '../providers/auth/auth';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { UserProvider } from '../providers/user/user';
import { CustomLoggedHeaderComponent } from '../components/custom-logged-header/custom-logged-header';
import { CapitalizePipe } from '../pipes/capitalize/capitalize';
import { UserInfoComponent } from '../components/user-info/user-info';
import { UserMenuComponent } from '../components/user-menu/user-menu';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { CrudPage } from '../pages/crud/crud';
import { crudProvider } from '../providers/crud/crud';

const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyDsCqoT9rTq7FzPEw-R2OtfziY_ISafGa8",
  authDomain: "ionic-trab-1c26b.firebaseapp.com",
  databaseURL: "https://ionic-trab-1c26b.firebaseio.com",
  storageBucket: "ionic-trab-1c26b.appspot.com",
  messagingSenderId: "478055486395"
}

@NgModule({
  declarations: [
    CapitalizePipe,
    CustomLoggedHeaderComponent,
    MyApp,
    HomePage,
    SignupPage,
    SigninPage,
    UserInfoComponent,
    UserMenuComponent,
    UserProfilePage,
    ProgressBarComponent,
    CrudPage
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseAppConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage,
    SigninPage,
    UserProfilePage,
    CrudPage
  ],
  providers: [
    AuthProvider,
    StatusBar,
    SplashScreen,
    UserProvider,
    crudProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
