import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { PanchaangaApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { DetailsPage } from '../pages/details/details';
import { PanchaangaService } from "../services/Panchaanga.service";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    PanchaangaApp,
    AboutPage,
    ContactPage,
    HomePage,
    DetailsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(PanchaangaApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    PanchaangaApp,
    AboutPage,
    ContactPage,
    HomePage,
    DetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PanchaangaService
  ]
})
export class AppModule {}
