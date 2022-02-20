import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth'
import "firebase/firestore"

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css']
})
export class VerifyCodeComponent implements OnInit {
  otpCode!: string
  verify: any
  constructor(private router: Router) { }

  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '40px',
      height: '40px'
    }
  }

  ngOnInit() {
    this.verify = JSON.parse(localStorage.getItem('verificationId') || '')
    console.log(this.verify);

  }

  onOtpChange(otp: any) {
    this.otpCode = otp

  }

  verifyCode() {
    var credentials = firebase.auth.PhoneAuthProvider.credential(this.verify, this.otpCode)
    firebase.auth().signInWithCredential(credentials).then((res: any) => {

      this.router.navigate(['/thank-you-page'])


    }).catch(error => console.log(error));
  }
}
