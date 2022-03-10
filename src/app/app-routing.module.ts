import { LoginComponent } from './refferal admin/login/login.component';
import { HomeComponent } from './layout/home/home.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import { ThankYouPageComponent } from './layout/thank-you-page/thank-you-page.component';
import { VerificationComponent } from './security/verification/verification.component';
import { VerifyCodeComponent } from './security/verify-code/verify-code.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './security/sign-up/sign-up.component';
import { RefferalAgentComponent } from './refferal admin/refferal-agent/refferal-agent.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'app' },

  { path: 'app/:id', component: HomeComponent },
  { path: 'verifyPhone', component: VerificationComponent },
  { path: 'verifyCode', component: VerifyCodeComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'thank-you', component: ThankYouPageComponent },
  { path: 'agent', component: RefferalAgentComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RefferalAgentComponent },
  { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
