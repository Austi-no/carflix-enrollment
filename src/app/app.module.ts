import { LoginComponent } from './refferal admin/login/login.component';

import { environment } from './../environments/environment.prod';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VerificationComponent } from './security/verification/verification.component';
import { SignUpComponent } from './security/sign-up/sign-up.component';
import { HeroComponent } from './layout/hero/hero.component';
import { FooterComponent } from './layout/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { VerifyCodeComponent } from './security/verify-code/verify-code.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { ThankYouPageComponent } from './layout/thank-you-page/thank-you-page.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { RefferalAgentComponent } from './refferal admin/refferal-agent/refferal-agent.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import { HomeComponent } from './layout/home/home.component';
import { DatePipe } from '@angular/common';
import { NgImageFullscreenViewModule } from 'ng-image-fullscreen-view';



@NgModule({
  declarations: [
    AppComponent,
    VerificationComponent,
    SignUpComponent,
    HeroComponent,
    FooterComponent,
    VerifyCodeComponent,
    ThankYouPageComponent,
    RefferalAgentComponent,
    NotFoundComponent,
    HomeComponent,
    LoginComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    // Firebase

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    NgOtpInputModule,
    NgxSpinnerModule, NgImageFullscreenViewModule
    // CountdownTimerModule.forRoot()
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule { }
