import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
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
  verificationId: any
  submitted!: boolean
  constructor(private router: Router, private zone: NgZone, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

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
    this.verificationId = JSON.parse(sessionStorage.getItem('verificationId') || '')

  }

  onOtpChange(otp: any) {
    this.otpCode = otp

  }

  verifyCode() {
    this.submitted = true
    this.spinner.show()
    var credentials = firebase.auth.PhoneAuthProvider.credential(this.verificationId, this.otpCode)
    firebase.auth().signInWithCredential(credentials).then((res: any) => {
      console.log(res);
      sessionStorage.setItem("dealerID", JSON.stringify(res?.user?.uid))
      sessionStorage.setItem("phoneNumber", JSON.stringify(res?.user?.phoneNumber))

      this.submitted = false
      this.zone.run(() => {
        this.router.navigate(['sign-up'])
      });
      this.spinner.hide()
      // setTimeout(() => {
      //   this.spinner.hide()
      //   this.router.navigate(['sign-up'])
      // }, 2000);

    }).catch((error: any) => {
      this.submitted = false
      this.spinner.hide()
      this.toastr.error('', error)
      console.log(error)
    })

  }
}
