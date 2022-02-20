import { VerificationComponent } from './security/verification/verification.component';
import { VerifyCodeComponent } from './security/verify-code/verify-code.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './security/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', component: VerificationComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'verifyCode', component: VerifyCodeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
