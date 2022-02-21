import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
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
  submitted!: boolean
  constructor(private router: Router, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

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

  }

  onOtpChange(otp: any) {
    this.otpCode = otp

  }

  verifyCode() {
    this.submitted = true
    var credentials = firebase.auth.PhoneAuthProvider.credential(this.verify, this.otpCode)
    firebase.auth().signInWithCredential(credentials).then((res: any) => {
      console.log(res);
      localStorage.setItem("dealerID", JSON.stringify(res?.user?.uid))
      localStorage.setItem("phoneNumber", JSON.stringify(res?.user?.phoneNumber))
      this.router.navigate(['/sign-up'])
      this.submitted = false

    }).catch((error: any) => {
      this.submitted = false
      this.toastr.error('', error)
      console.log(error)
    })

  }
}
